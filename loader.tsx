// eslint-disable-next-line import/no-anonymous-default-export
export default `
body{
display: block;
}
#globalLoader{
    position: fixed;
    z-index: 1700;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background-color: #fff;
    display: flex;
    left: 0,
    right: 0;
    width: 100%;
    height: 100%;
    justify-content: center;
    align-items: center;
}

.headingLoader{
    text-align: center;
    margin-left: auto;
    margin-right: auto;
    margin-bottom: 20px;
    color: #000000;
    font-weight: 300 !important;
    font-family: 'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif !important;
    paddingleft: 10px;
    paddingRight: 10px;
    fontSize: 24px;
}

.sk-cube-grid {
    width: 50px;
    height: 50px;
    margin-left: auto;
    margin-right: auto;
}

.sk-cube-grid .sk-cube {
    width: 33%;
    height: 33%;
    background-color: #000000;
    float: left;
    animation: sk-cubeGridScaleDelay 1.3s infinite ease-in-out;
}

.sk-cube-grid .sk-cube1 {
    animation-delay: 0.2s;
}

.sk-cube-grid .sk-cube2 {
    animation-delay: 0.3s;
}

.sk-cube-grid .sk-cube3 {
    animation-delay: 0.4s;
}

.sk-cube-grid .sk-cube4 {
    animation-delay: 0.1s;
}

.sk-cube-grid .sk-cube5 {
    animation-delay: 0.2s;
}

.sk-cube-grid .sk-cube6 {
    animation-delay: 0.3s;
}

.sk-cube-grid .sk-cube7 {
    animation-delay: 0s;
}

.sk-cube-grid .sk-cube8 {
    animation-delay: 0.1s;
}

.sk-cube-grid .sk-cube9 {
    animation-delay: 0.2s;
}

@keyframes sk-cubeGridScaleDelay {
    0%,
    70%,
    100% {
        transform: scale3D(1, 1, 1);
    }

    35% {
        transform: scale3D(0, 0, 1);
    }
}
}`;