import { Component } from 'react';
import './App.css';
import {Course} from "./components/course"
import {NewCourseForm} from "./components/NewCourseForm";
import { CategoryService } from './services/categoryService';
import {CourseService} from "./services/CourseService"; 


class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      courses: [],
      categories: []
    }
    this.add = this.add.bind(this);
    this.remove = this.remove.bind(this);
    this.startData = this.startData.bind(this)
    
    this.startData();
  }

  async startData(){
    
    const [courses, categories] = await Promise.all([
      CourseService.list(),
      CategoryService.list()
    ])
    this.setState({
      courses,
      categories
    })
  }

  async add(course){
    const {courses} = this.state,
          newCourse = await CourseService.create(course);
    courses.push(newCourse);
    this.setState({courses})
  }


  async remove(courseId){
    const {courses} = this.state,
          courseIndex = courses.findIndex(course => course.id === courseId)
    await CourseService.delete(courseId);
    courses.splice(courseIndex, 1);
    this.setState({courses});
  } 

  render(){
    const {state} = this
    return(
      <div className="App">
        <NewCourseForm onSubmit={this.add} categories={state.categories}/>
          <ul className="courses-list">
              {
                state.courses.map(course => <Course course = {course}  onRemove={this.remove}/>)
              }
          </ul>
      </div>
    )
  }
}

export default App;
