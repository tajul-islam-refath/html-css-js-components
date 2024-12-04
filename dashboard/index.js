document.addEventListener("DOMContentLoaded", function () {
  //   const dataToggles = document.querySelectorAll("[data-target]");
  //   dataToggles.forEach((toggol) => {
  //     toggol.addEventListener("click", function (e) {
  //       e.preventDefault();

  //       const targetSelector = toggol.getAttribute("data-target");
  //       console.log("targetSelector", targetSelector);
  //       const targetElement = document.getElementById(targetSelector);
  //       console.log("targetElement", targetElement);

  //       if (targetElement) {
  //         const isVisible = targetElement.classList.contains("show");
  //         console.log("isVisible", isVisible);
  //         if (isVisible) {
  //           targetElement.classList.remove("show");
  //         } else {
  //           targetElement.classList.add("show");
  //         }
  //       }

  //       const isExpanded = toggol.getAttribute("aria-expanded") == "true";
  //       toggol.setAttribute("aria-expanded", !isExpanded);
  //     });
  //   });

  // nav collapse
  const dataToggles = document.querySelectorAll('[data-toggle="collapse"]');
  dataToggles.forEach((toggol) => {
    toggol.addEventListener("click", function (e) {
      e.preventDefault();

      const targetSelector = toggol.getAttribute("data-target");
      console.log("targetSelector", targetSelector);
      const targetElement = document.getElementById(targetSelector);
      console.log("targetElement", targetElement);

      if (targetElement) {
        const isVisible = targetElement.classList.contains("show");

        if (isVisible) {
          // If open, collapse it
          targetElement.style.height = `${targetElement.scrollHeight}px`; // Set height to current height
          requestAnimationFrame(() => {
            targetElement.style.height = "0px"; // Collapse to 0
          });
          targetElement.addEventListener(
            "transitionend",
            () => {
              targetElement.classList.remove("show");
              targetElement.style.height = ""; // Reset height
            },
            { once: true }
          );
        } else {
          // If closed, expand it
          targetElement.classList.add("show"); // Add 'show' before expanding
          targetElement.style.height = "0px"; // Start from 0
          requestAnimationFrame(() => {
            targetElement.style.height = `${targetElement.scrollHeight}px`; // Expand to full height
          });
          targetElement.addEventListener(
            "transitionend",
            () => {
              targetElement.style.height = ""; // Reset height after transition
            },
            { once: true }
          );
        }
      }

      const isExpanded = toggol.getAttribute("data-expanded") == "true";
      toggol.setAttribute("data-expanded", !isExpanded);
    });
  });

  // click animation
  const createBall = (top, left) => {
    const ball = document.createElement("div");
    ball.classList.add("ball");
    ball.style.top = top + "px";
    ball.style.left = left - 25 + "px";
    document.body.appendChild(ball);
    return ball;
  };

  const initFalling = (ball) => {
    const ballHeight = 50;
    const acceleration = 9.8 / 60;
    const { innerHeight } = window;
    let fallingSpeed = 0;
    const animateFall = () => {
      const top = parseInt(ball.style.top);
      const newTop = `${top + fallingSpeed}px`;
      /* To break the fall, when the ball is near the surface */
      if (parseInt(newTop) >= innerHeight - ballHeight) {
        ball.style.top = this.innerHeight - ballHeight + "px";
        ball.style.background = "red";
        ball.remove();
        return null;
      }

      console.log(fallingSpeed);

      /* Else set the top to the new value */
      ball.style.top = newTop;
      fallingSpeed = fallingSpeed + acceleration;
      requestAnimationFrame(animateFall);
    };
    requestAnimationFrame(animateFall);
  };

  const onClickListener = (event) => {
    const { x, y } = event;
    const ball = createBall(y, x);
    initFalling(ball);
  };
  document.addEventListener("click", onClickListener, false);

  // toggle sidenav
  const navToggleBtn = document.getElementById("navToggleBtn");
  const nav = document.getElementById("nav");
  const main = document.getElementById("main");

  navToggleBtn.addEventListener("click", function () {
    const isExpanded = navToggleBtn.getAttribute("aria-expanded") == "true";
    if (isExpanded) {
      nav.style.width = "260px";
      nav.style.minWidth = "260px";
      main.style.marginLeft = "260px";
    } else {
      nav.style.width = "60px";
      nav.style.minWidth = "60px";
      main.style.marginLeft = "60px";
    }

    navToggleBtn.setAttribute("aria-expanded", !isExpanded);
  });
});
