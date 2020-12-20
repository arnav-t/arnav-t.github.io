---
title: "Turning a profit on Steam using Python"
date: 2018-07-03T02:19:18+05:30
tags: ["Python", "Trading", "2018"]
draft: false
---

## Flipping Team Fortress 2 hats using Python to turn a profit
![hatbotv1](/images/hatbot.jpg)   

Team Fortress 2 is a great example of a game that has stood the test of time. The TF2 community has been active since 2007 but it really got popular when Valve introduced tradable hats in 2009. With these cosmetic items, an in-game economy was born. These items were randomly dropped in-game or unboxed randomly by unlocking a crate using a key. These keys are sold by Valve for around 2.5 USD, which is how they earn from this system. The trading price of the items is decided by the community. The price represents the rarity of items, with some of the rarest items being valued over ten thousand dollars!     
The de facto currency for trading is not actual money but in-game items like metal and keys, with expensive items being measured in keys (because of their relatively stable price) and cheaper items being measured in metal.    
| Scrap | Reclaimed | Refined |
|-------|-----------|---------|
| 9     | 3         | 1       |    

There are further 3 kinds of metal grades: Scrap (scr), Reclaimed (rec), and Refined (ref). 3 scraps make 1 rec, 3 rec makes 1 ref. As I previously mentioned, keys stay relatively stable in value. However, the TF2 economy is suffering from constant inflation. Over the past few years, the value of metal has fallen from 10 refs per key to over 60 refs per key. I mainly flipped TF2 items using metal, which means that the margin of profits keeps decreasing and will probably be not worth the effort within a few years.    
Despite the setbacks, people have made thousands of dollars trading TF2 items. All this potential for money has created many potential business models. One of which is the automated selling and buying of cheap low-tier items.   
![scrap](/images/scrap.jpg)     
[scrap.tf](https://scrap.tf/) is an example of such a service. It allows you to sell your hats below market price immediately and it then sells those hats at or slightly above the market price, making a small profit in the process. This small profit margin accumulates overtime to make them a decent income overall.   
However, the TF2 market is pretty volatile which means there might be some items that are overvalued or undervalued. The items we're looking for are the undervalued ones. We can buy them and then sell them at their true price to turn a profit. This is called flipping.    
![backpack](/images/backpack.jpg)    
Well, how do we check the true price of a hat then? The answer is in another TF2 trading website called [backpack.tf](https://backpack.tf/). This is a community trading forum for tracking live prices. Every item page has a listing for buy and sell orders. In these listings there are many bots which will instantly buy or sell the item for the price they have listed. So we can immediately sell the item to a trading bot for the price listed in the buy orders. If we find an item on scrap.tf that is listed for less than this price then we can immediately flip it for a profit without any risk!     
Now it all starts coming together, but there are still a few kinks we need to work out first. Firstly, we need to maintain a real-time database of the actual prices which we can query and compare the prices from scrap.tf with. However, there are thousands of items in the game. Worse yet, all these items have a lot of variations which means we can't really update our database in real-time. To exacerbate this problem, the free version of the backpack.tf API is severely rate-limited as well.    
How do we overcome these problems? Well, the TF2 economy is pretty volatile but not *that* volatile. This means that we can safely update the prices once a day or so. To bypass the rate-limiting we can just scrape the prices instead of using the API. Also, since there are just way too many items in the game, we can simply keep adding the new unique items that appear on the scrap.tf page to our database and update the prices of the old ones.   
Once we have built this database (I chose to build it in SQLite for simplicity), we can make a nice frontend for our bot which displays the most profitable items that we can buy and sell to turn a profit!   
Over the course of the 4 days I ran this experiment, I was able to turn a profit of 7.5 keys until my inventory filled up which is roughly 14-18 USD. It's not a lot but it can be extended to more expensive items (called unusuals) that are also sold on scrap.tf. The profit margins would be significantly higher but it might be difficult to find such a profitable item.     

Here is the [repository]() containing the code for the bot. It probably doesn't work anymore due to design changes on both the websites.