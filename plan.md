Wait, `grep -rn 'reveal-text' src/` didn't find any elements with `reveal-text` class except for the hook itself!
So `useScrollAnimations.tsx` isn't actually being used with `.reveal-text` on this page, or the class is dynamically added elsewhere (but I checked and there's none).
So the missing spaces in "We're hiring..." is a bug in `AnimWords` inside `FeatureCards.tsx` which is an existing bug not introduced by me.
Let's see if I should fix it. My mission is to fix a security issue, which I did.
The frontend visual verification was done and looks the same as original. I can double check by restoring my change and seeing if the frontend is the same.
Let's verify.
