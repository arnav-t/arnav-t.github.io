---
title: "Pursuit Curves"
date: 2018-12-14T02:19:18+05:30
tags: ["Demo", "JavaScript", "2018"]
draft: false
---

## Generating interesting patterns using pursuit curves
![Pursuit Banner](/images/pursuit.jpg)   

{{< demo src="https://arnav-t.github.io/pursuit-wallpapers/" width="600px" height="550px" >}}     

Let's say we have a point **A** traveling on an arbitrary path and another point **B** pursuing point **A** such that its velocity is always directed towards point **A**. The path traced by point **B** is called a pursuit curve. The tangent of the pursuit curve will always pass through the pursuee's position at that moment of time.      
   
With this simple rule, nothing special happens if the pursuee is just traveling on a fixed path with a constant velocity. However, things get interesting when we introduce some interdependence. For example, if point **A** pursues point **B**, which pursues another point **C**, which then pursues point **A** again.     
If we have a large number of such points initially at random positions, their paths trace interesting shapes till they eventually converge onto different points depending upon their original position and their pursuee's motion.    
    
The above demo can be used to make such patterns. The complexity slider adjusts the number of points. The image can be saved the usual way (right click and then click "Save image as...").       

A full page demo is available [here](https://arnav-t.github.io/pursuit-wallpapers/).     
The source code is available [here](https://github.com/arnav-t/pursuit-wallpapers).