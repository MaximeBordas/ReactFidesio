import React, {Component} from 'react'
import ReactTable from "react-table";
import 'react-table/react-table.css'

const API_URL = 'https://data.ratp.fr/api/records/1.0/search/?dataset=liste-des-commerces-de-proximite-agrees-ratp&rows=1000&sort=code_postal&facet=tco_libelle&facet=code_postal';

class Table extends Component{
    constructor(){
        super();
        this.state= {
            data: []
        }
    }

    componentDidMount(){
        this.getApi()
    }

    getApi(data =''){
        fetch(API_URL + `&q=${data}`)
            .then(res => res.json())
            .then(data => this.setState({
                data: data.records
            }))
            .catch(error =>
                console.log(error))
    }

    search(e){
        const input = e.target.value;
        this.getApi(input)
    }

    render(){
        const columns = [
            {
                Header: 'Libellé',
                accessor: 'fields.tco_libelle' // String-based value accessors!
            },
            {
                Header: 'Ville',
                accessor: 'fields.ville' // String-based value accessors!
            },
            {
                Header: 'Code postal',
                accessor: 'fields.code_postal' // String-based value accessors!
            },
        ];

        return(
            <div>
                <div >
                    Recherche <input type="text" name="search" onKeyUp={(e) => this.search(e)}/>
                    <ReactTable data={this.state.data} columns={columns} />
                </div>
            </div>
        );
    }
}

export default Table