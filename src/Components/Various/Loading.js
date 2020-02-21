import React, {Component} from 'react';
import ReactLoading from 'react-loading';
import '../Css/Loading.css'


class Loading extends Component {
  render() {
    return (
        <div className='loading'>
          <div className='loading-image-container'>
            <ReactLoading className='loading-image' type='spin' color='#000000' />
          </div>
        </div>
    );
  }
}

export default Loading;
