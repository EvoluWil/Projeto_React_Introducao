import { Component } from "react";


export class NewCourseForm extends Component{
    
    static defaultProps = {
        onsubmit: ()=>{},
        categories: []
    }
   
    constructor(props){
        super(props);
        this.state = {
            name: "",
            category: "",
            img: ""
        }
        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    handleSubmit(event){
        event.preventDefault();
        const newCourse = this.state;

        if(newCourse.name && newCourse.img && newCourse.category){
            this.props.onSubmit(newCourse);
            this.setState({
                name: "",
                img: "",
            });

        }
    }


    handleChange(event){
        const {target} = event,
              {name, value} = target;
        
        this.setState({
            [name]: value
        })
    }
    
    render(){
        const {props, state} = this;
        return(
            <form className="course-form" onSubmit={this.handleSubmit}>
                <label>
                    <span>Nome:</span>
                    <input name ="name" value={state.name} onChange={this.handleChange}/>
                </label>
                <label>
                    <span>Imagem:</span>
                    <input name ="img" value={state.img} onChange={this.handleChange}/>
                </label>

                <label>
                    <span>Categoria:</span>
                    <select name="category" value={state.category} onChange={this.handleChange}>
                        <option value="">Selecionar</option>
                       {
                           props.categories.map(category => <option value={category.name}>{category.name}</option>)
                       }
                    </select>
                </label>
                <button type="submit">Criar Curso</button>


            </form>
        )
    }
} 