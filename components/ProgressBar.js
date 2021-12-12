import { ProgressBar, Colors } from 'react-native-paper';
import React, {Component} from 'react';
import PropTypes from 'prop-types';


class Progress extends Component{
  render(){

    return( 
          <ProgressBar progress={this.props.completion} color={Colors.green800} style={{height:25, width: 350, alignSelf: 'center', marginVertical: 20}} />
      )
    } 
    }

export default Progress;
