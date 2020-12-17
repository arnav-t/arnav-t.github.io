---
title: "Simulating birds in your browser"
date: 2020-04-30T02:19:18+05:30
tags: ["Demo", "JavaScript", "2020"]
draft: false
---

## Boids: simulating the flocking behavior of birds
{{< demo src="https://arnav-t.github.io/js-boids/" width="100%" height="550px" >}}     

Bird-oid objects or "boids" for short is a simple way to simulate the flocking behavior of birds using some simple rules. Boids exhibit emergent behavior (similar to [pursuit curves](/posts/pursuit/)) which means that the complexity of Boids arises from the interaction of many boids together adhering to a set of simple rules.    

A typical simulation has three main rules:    
1. **Separation**: boids try to avoid colliding with each other. This is implemented by applying mutual repulsion if the boids get too close to each other.
2. **Alignment**: boids try to steer towards the average heading of their flockmates. This can be implemented by gently accelerating the boids to the average flock velocity.
3. **Cohesion**: Flockmates try to stay close to the center of mass of the flock. Implemented by applying a mutual attraction between flockmates towards the center.   
    
More simple rules such as these can be added to add additional behavior, such as perching.   

A full page demo is available [here](https://arnav-t.github.io/js-boids/).     
The source code is available [here](https://github.com/arnav-t/js-boids).