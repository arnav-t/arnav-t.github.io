---
title: "Discovering Open SMTP Relays"
date: 2019-11-14T01:06:18+05:30
tags: ["Security", "2019"]
draft: false
---

## A simple way to discover Open SMTP Relays in the wild
***Disclaimer**: This article is for educational purposes only.*
### What is SMTP?
SMTP is an ancient protocol used for email transmission. As with most ancient protocols, it is relatively simple in design. SMTP works on plaintext only which makes it very easy to play around with. 
### What are SMTP Relays?
SMTP Relays are like your local post office. They take your mail, figure out where to send it (in this case using DNS), and send it either to another post office along the way or directly to your intended recipient if possible. Much like a post office, each SMTP Relay has a "domain". The SMTP server only allows emails originating from or destined to the addresses belonging to this domain. For example, `mx.example.com` will be responsible for handling all the emails to and from `*@example.com`.
### What are Open SMTP Relays?
Usually, SMTP servers are configured to allow emails to or from their own domain. Open SMTP servers, however, allow _anyone_ to send emails to anyone else on the internet! They were once commonplace but disappeared because of abuse by spammers.
### What's the big deal?
An open SMTP server allows you to forge sender information and impersonate anyone on the internet! This made them a really powerful tool for spamming and phishing.
### How to find them?
First, we need to find a mail server to test. How do we do that? Well, we can just look up DNS records! Let's say if you wanted to find out the mail servers of `google.com`, you could use the `dig` utility:
```
$ dig google.com MX
```
```
; <<>> DiG 9.11.3-1ubuntu1.13-Ubuntu <<>> google.com MX
;; global options: +cmd
;; Got answer:
;; ->>HEADER<<- opcode: QUERY, status: NOERROR, id: 27593
;; flags: qr rd ad; QUERY: 1, ANSWER: 14, AUTHORITY: 0, ADDITIONAL: 0
;; WARNING: recursion requested but not available

;; QUESTION SECTION:
;google.com.                    IN      MX

;; ANSWER SECTION:
google.com.             0       IN      MX      40 alt3.aspmx.l.google.com.
google.com.             0       IN      MX      30 alt2.aspmx.l.google.com.
google.com.             0       IN      MX      10 aspmx.l.google.com.
google.com.             0       IN      MX      50 alt4.aspmx.l.google.com.
google.com.             0       IN      MX      20 alt1.aspmx.l.google.com.
aspmx.l.google.com.     0       IN      A       74.125.24.26
alt1.aspmx.l.google.com. 0      IN      A       74.125.28.26
alt2.aspmx.l.google.com. 0      IN      A       74.125.137.26
alt3.aspmx.l.google.com. 0      IN      A       173.194.199.26
alt4.aspmx.l.google.com. 0      IN      A       209.85.146.26
ns1.google.com.         0       IN      A       216.239.32.10
ns2.google.com.         0       IN      A       216.239.34.10
ns3.google.com.         0       IN      A       216.239.36.10
ns4.google.com.         0       IN      A       216.239.38.10

;; Query time: 102 msec
;; SERVER: 172.30.208.1#53(172.30.208.1)
;; WHEN: Wed Nov 11 04:29:58 IST 2019
;; MSG SIZE  rcvd: 538

```
To test any of them, we can open a TCP socket on port 25 (using the `netcat` utility, for example) and try to send SMTP commands as if we're talking to an open SMTP relay.
```
HELO example.com
MAIL FROM:test@example.com
RCPT TO:test@test.com
QUIT
```
This would fail in a well-configured relay, but an open SMTP relay would allow your request to go through. We can even automate this using a shell script to test a bunch of SMTP servers simultaneously.
```bash
#!/bin/bash

while read host
do
    output="$(printf 'HELO example.com\nMAIL FROM:test@example.com\nRCPT TO:test@test.com\nQUIT\n' | nc $host 25 -w 1 2> /dev/null)"
    if ! [[ -z $output ]]
    then
        if ! [[ $output =~ denied ]]
        then
            echo $host
        fi
    fi
done < ${1:-/dev/stdin}
```
To make things go faster, we can even multiprocess it in Python using the `smtplib` module!
```python
import multiprocessing as mp
import smtplib

counter = mp.Value('i', 0)
def testServer(host, port=465):
	global counter
	with counter.get_lock():
		counter.value += 1
	if counter.value%10 == 0:
		print(f'{counter.value}')
	try:
		s = smtplib.SMTP(host=host, port=port, timeout=5)
		s.sendmail('hi@test.com', [f"admin@{'.'.join(host.split('.')[1:])}"], 'message goes here')
		print(f'\n{host}\n')
		return host
	except Exception as e:
		print(e)
		return False

if __name__== '__main__':
	with open('results.txt') as f:
		hosts = f.readlines()
	print('+')
	hosts = [host.rstrip() for host in hosts]
	p = mp.Pool(16)
	res = p.map(testServer, hosts)
	with open('results.txt', 'w') as f:
		for host in res:
			if host:
				f.write(f'{host}\n')
``` 
