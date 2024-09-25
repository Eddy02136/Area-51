## Description

This is a front-end Proof of Concept (PoC) for our AREA-51 project. The application features an animated background and four moving planets. Each planet is clickable, demonstrating the clickable functionality of the components.

## Architecture

The project structure is organized as follows:

    src/: The main folder containing all the source code.
    ├── App.js: The main entry point of the application where all components are rendered.
    ├── components/: Contains all the planet-related components.
    │   ├── Mars/
    │   │   ├── mars_components/
    │   │   │   ├── Sphere.jsx: Responsible for rendering the 3D sphere representing Mars.
    │   │   │   ├── CameraControls.jsx: Manages the camera movements and controls around Mars.
    |   |   ├── marsComponent.js: complete component of the moving planet mars.
    │   ├── Earth/
    │   │   ├── earth_components/
    │   │   │   ├── Sphere.jsx: Responsible for rendering the 3D sphere representing Earth.
    │   │   │   ├── CameraControls.jsx: Manages the camera movements and controls around Earth.
    |   |   ├── earthComponent.js: complete component of the moving planet earth.
    │   ├── Neptune/
    │   │   ├── neptune_components/
    │   │   │   ├── Sphere.jsx: Responsible for rendering the 3D sphere representing Neptune.
    │   │   │   ├── CameraControls.jsx: Manages the camera movements and controls around Neptune.
    |   |   ├── neptuneComponent.js: complete component of the moving planet neptune.
    │   ├── EarthMoon/
    │   │   ├── earthmoon_components/
    │   │   │   ├── Sphere.jsx: Responsible for rendering the 3D sphere representing Earth's Moon.
    │   │   │   ├── CameraControls.jsx: Manages the camera movements and controls around Earth's Moon.
    |   |   ├── earthMoonComponent.js: complete component of the moving earth moon.

This structure ensures each planet has its own set of components, keeping the project modular and easy to maintain.


## Technologies

React.js: Used for its practicality and flexibility in building user interfaces. React's component-based architecture allows for modular and reusable components, which fits well with the design of this PoC.

Three.js: A JavaScript library used for rendering 3D components. It handles the 3D animations, planets, and camera controls, allowing for a visually dynamic experience in the application.