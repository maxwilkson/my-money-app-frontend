import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { arrayInsert, arrayRemove, Field } from 'redux-form'
import Input from '../commom/form/input'
import Grid from '../commom/layout/grid'
import If from '../commom/operator/If'

class ItemList extends Component {

    add(index, item = {}) {
        if (!this.props.readOnly) {
            this.props.arrayInsert('billingCycleForm', this.props.field, index, item)
        }

    }

    remove(index) {
        if (!this.props.readOnly && this.props.list.length > 1) {
            this.props.arrayRemove('billingCycleForm', this.props.field, index)
        }

    }

    renderRows() {
        const list = this.props.list || []
        return list.map((item, index) => (
            <tr key={index}>
                <td><Field name={`${this.props.field}[${index}].name`} component={Input} readOnly={this.props.readOnly} placeholder='Informe o nome'></Field></td>
                <td><Field name={`${this.props.field}[${index}].value`} component={Input} readOnly={this.props.readOnly} placeholder='Informe o valor'></Field></td>
                <If test={this.props.showStatus}>
                    <td><Field name={`${this.props.field}[${index}].status`} component={Input} readOnly={this.props.readOnly} placeholder='Informe o status'></Field></td>
                </If>
                <td>
                    <button type='button' className='btn btn-success' onClick={() => this.add(index + 1)}>
                        <i className='fa fa-plus'></i>
                    </button>
                    <button type='button' className='btn btn-warning' onClick={() => this.add(index + 1, item)}>
                        <i className='fa fa-clone'></i>
                    </button>
                    <button type='button' className='btn btn-danger' onClick={() => this.remove(index)}>
                        <i className='fa fa-trash-o'></i>
                    </button>
                </td>
            </tr>
        ))
    }

    render() {
        return (
            <Grid cols={this.props.cols}>
                <fieldset>
                    <legend>{this.props.legend}</legend>
                    <table className='table'>
                        <thead>
                            <tr>
                                <th>Nome</th>
                                <th>Valor</th>
                                <If test={this.props.showStatus}>
                                    <th>Status</th>
                                </If>
                                <th className='table-actions'>A????es</th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.renderRows()}
                        </tbody>
                    </table>
                </fieldset>
            </Grid>
        )
    }
}

const mapDispatchToProps = dispatch => bindActionCreators({ arrayInsert, arrayRemove }, dispatch)
export default connect(null, mapDispatchToProps)(ItemList);