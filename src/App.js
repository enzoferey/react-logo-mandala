import React, { Component } from 'react';
import './App.css';

//const colors = [ "#61dafb", "#0496ff", "#027bce" ];
const colors = [ "#581845", "#900C3F", "#C70039", "#FF5733", "#FFC300" ];

class App extends Component {
  constructor() {
    super();
    this.state = {
      rotations: [ 0, 120, 240 ],
      speeds: [ 1, 2, 3 ],
      ovales: [],
      colorIndex: 0,
    };

    this.handleClick = this.handleClick.bind(this);
    this.doRotation = this.doRotation.bind(this);
  }

  componentDidMount() {
    setInterval(this.doRotation, 100);
  }

  doRotation() {
    this.setState((prevState) => (
      {
        rotations: [
          prevState.rotations[0] + prevState.speeds[0],
          prevState.rotations[1] + prevState.speeds[1],
          prevState.rotations[2] + prevState.speeds[2],
        ]
      }
    ));
  }

  handleClick() {
    this.setState((prevState) => (
      {
        ovales: [
          ...prevState.ovales,
          { color: colors[prevState.colorIndex], rotation: prevState.rotations[0] },
          { color: colors[prevState.colorIndex], rotation: prevState.rotations[1] },
          { color: colors[prevState.colorIndex], rotation: prevState.rotations[2] },
        ],
        colorIndex: (prevState.colorIndex + 1)%colors.length
      }
    ));
  }

  render() {
    const { colorIndex, rotations, ovales } = this.state;
    const currentColor = colors[colorIndex];
    return (
      <div className="App" onClick={this.handleClick}>
        <div className="logo-container">
          {ovales.map((ovale, index) => (
            <Ovale key={`ovale-${index}`} fill={ovale.color} rotation={ovale.rotation}/>
          ))}
          <Center fill={currentColor} />
          <Ovale fill={currentColor} rotation={rotations[0]} />
          <Ovale fill={currentColor} rotation={rotations[1]} />
          <Ovale fill={currentColor} rotation={rotations[2]} />
        </div>
      </div>
    );
  }
}

const Ovale = ({ fill, rotation }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 300 121.46" className="Ovale-logo" style={{ transform: `translate(-50%, -25%) rotate(${rotation}deg)` }}>
    <path fill={fill} d="M500.65,439c-82.85,0-150,27.19-150,60.73s67.15,60.73,150,60.73,150-27.19,150-60.73S583.49,439,500.65,439ZM501,547.75c-75.77,0-137.19-21.64-137.19-48.33S425.21,451.09,501,451.09s137.18,21.64,137.18,48.33S576.75,547.75,501,547.75Z" transform="translate(-350.65 -439)"/>
  </svg>
);

const Center = ({ fill }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 53.58 53.58" className="Center-logo">
    <circle fill={fill} cx="26.79" cy="26.79" r="26.79"/>
  </svg>
);

export default App;
