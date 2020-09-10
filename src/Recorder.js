import React, { Component } from 'react'

const { ipcRenderer } = window.require('electron');

class Recorder extends Component {

    startRecording = () => {
        console.log('Start Recording');
        ipcRenderer.send('START_RECORDING');
    }

    stopRecording = () => {
        console.log('Stop Recording');
        ipcRenderer.send('STOP_RECORDING');
    }

    pauseRecording = () => {
        console.log('Pause Recording');
        ipcRenderer.send('PAUSE_RECORDING');
    }

    resumeRecording = () => {
        console.log('Resume Recording');
        ipcRenderer.send('RESUME_RECORDING');
    }

    render() {
        return (
            <div style={{ height: '200px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', margin: '100px 100px' }}>
                <button type='button' onClick={this.startRecording}>Start Recording</button>
                <button type='button' onClick={this.stopRecording}>Stop Recording</button>
                <button type='button' onClick={this.pauseRecording}>Pause Recording</button>
                <button type='button' onClick={this.resumeRecording}>Resume Recording</button>
            </div>
        )
    }
}

export default Recorder
