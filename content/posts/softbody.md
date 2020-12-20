---
title: "Soft-body physics using springs"
date: 2015-03-21T02:19:18+05:30
tags: ["C++", "Physics", "Video", "2015"]
draft: false
---

## Simulating soft-bodies using springs
{{< youtube D7xnKLE-82M >}}    

Soft-bodies are fun to play around with. It is quite satisfying to throw around a soft-body in a simulation and watch the seemingly complicated behavior that unfolds.   
However, the truth is, soft-bodies are far simpler to simulate than rigid bodies. Rigid bodies require more involved impulse calculations whereas a simple convex-rigid body simulation can just be approximated using point-to-point interactions.    
This can be simplified much further when the interactions are between a plane and a body, in fact, the body doesn't even need to convex anymore. When the body has to interact with planes only, checking intersections with vertices is enough to determine if a collision has occurred which greatly speeds up the simulation, which greatly reduces the complexity.    
### Point-to-point interactions
Coming to the crux of this post, how do we approximate soft-body behavior using a few vertices? One would think that the additional constraint of no relative motion between the vertices of a rigid body would simplify the simulation. However, if the points are not affixed to each other in such a way, it allows us to emulate their relative motion using some simple equations, namely Hooke's law. Hooke's law with a damping coefficient added would give us the "jiggly" behavior we want.    
Springs follow Hooke's law, so we can pretend that each point is attached to the other. Now, the question is, how are the points attached to each other? There are two ways I found that worked reasonably well.    
![spring configuration](/images/bodyspring.jpg)    
- **Diagonals and neighbours only**: This is a cheap way to simulate the body. The number of springs is linear which makes it faster however I found it had noticeably lower "jiggliness" relative to the mesh configuration.
- **Mesh configuration**: This method needs a quadratic number of springs which can cause it to choke on complex shapes, however, the quality of simulation was excellent.    
    
With these simple rules in place, a program can simulate reasonably jiggly soft-bodies for very little overhead.    

The code can be found at this [GitHub repository](https://github.com/arnav-t/soft-body).