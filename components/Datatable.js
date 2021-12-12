import * as React from 'react';
import { DataTable } from 'react-native-paper';

const Table = ({userDetails, level}) => {
  console.log(level)
  const getPercentage = (denominator, numerator)=>{
    if (denominator!= 0){
      let result = denominator*100/numerator;
      return(Math.floor(result))
    }else{
      return(0)
    }
  }
  const getAvTime = (denominator, numerator)=>{
    if (denominator!= 0){
      let result = denominator/numerator
      return(Math.floor(result))
    }else{
      return(0)
    }
  }
  const getLevel = (difficulty)=>{
    if(difficulty > level){
      return('Locked')
    }else if(difficulty==level){
      return('In Progress')
    }else{
      return('Passed')
    }
  }
  return(
  <DataTable>
    <DataTable.Header>
      <DataTable.Title>Progress</DataTable.Title>
      <DataTable.Title numeric>Accuracy</DataTable.Title>
      <DataTable.Title numeric>Average Speed</DataTable.Title>
      <DataTable.Title numeric>Status</DataTable.Title>
    </DataTable.Header>

    <DataTable.Row>
      <DataTable.Cell>Beginner</DataTable.Cell>
      <DataTable.Cell numeric>{getPercentage(userDetails.beginner.correctQuestions,userDetails.beginner.questions)}%</DataTable.Cell> 
      <DataTable.Cell numeric>{getAvTime(userDetails.beginner.timeTaken,userDetails.beginner.testsTaken)}s</DataTable.Cell>
      <DataTable.Cell numeric>{getLevel(0)}</DataTable.Cell>
    </DataTable.Row>

    <DataTable.Row>
      <DataTable.Cell>Intermediate</DataTable.Cell>
      <DataTable.Cell numeric>{getPercentage(userDetails.intermediate.correctQuestions,userDetails.intermediate.questions)}%</DataTable.Cell> 
      <DataTable.Cell numeric>{getAvTime(userDetails.intermediate.timeTaken,userDetails.intermediate.testsTaken)}s</DataTable.Cell>
      <DataTable.Cell numeric>{getLevel(1)}</DataTable.Cell>
    </DataTable.Row>

    <DataTable.Row>
      <DataTable.Cell>Advanced</DataTable.Cell>
      <DataTable.Cell numeric>{getPercentage(userDetails.advanced.correctQuestions,userDetails.advanced.questions)}%</DataTable.Cell> 
      <DataTable.Cell numeric>{getAvTime(userDetails.advanced.timeTaken,userDetails.advanced.testsTaken)}s</DataTable.Cell>
      <DataTable.Cell numeric>{getLevel(2)}</DataTable.Cell>
    </DataTable.Row>

    <DataTable.Pagination
      page={1}
      onPageChange={page => {
        console.log(page);
      }}
    />
  </DataTable>
)};

export default Table;