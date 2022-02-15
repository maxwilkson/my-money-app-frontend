import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Field, formValueSelector, reduxForm } from 'redux-form'
import InputAndLabel from '../commom/form/inputAndLabel'
import { init } from './billingCycleActions'
import ItemList from './itemList'
import Summary from './summary'

class BillingCycleForm extends Component {

    calculateSummmary() {
        const sum = (x = 0, y = 0) => x + y
        const credits = this.props.credits || [{ value: 0 }]
        const debts = this.props.debts || [{ value: 0 }]
        return {
            creditSum: credits.map(c => +c.value || 0).reduce(sum),
            debtSum: debts.map(d => +d.value || 0).reduce(sum)
        }
    }

    render() {
        const { handleSubmit, readOnly, submitLabel, submitClassName, credits, debts } = this.props
        const { creditSum, debtSum } = this.calculateSummmary()
        return (
            <form role='form' onSubmit={handleSubmit}>
                <div className='box-body'>
                    <Field name='name' component={InputAndLabel} cols='12 4'
                        label='Nome' placeholder='Informe o nome' readOnly={readOnly} />
                    <Field name='month' component={InputAndLabel} cols='12 4' type='number'
                        label='Mês' placeholder='Informe o mês' readOnly={readOnly} />
                    <Field name='year' component={InputAndLabel} cols='12 4' type='number'
                        label='Ano' placeholder='Informe o ano' readOnly={readOnly} />
                    <Summary credit={creditSum} debt={debtSum}></Summary>
                    <ItemList list={credits} field='credits' legend='Créditos' cols='12 6' readOnly={readOnly}></ItemList>
                    <ItemList list={debts} field='debts' legend='Débitos' cols='12 6' readOnly={readOnly} showStatus={true}></ItemList>
                </div>
                <div className='box-footer'>
                    <button type='submit' className={`btn btn-${submitClassName}`}>{submitLabel}</button>
                    <button type='button' className="btn btn-default" onClick={this.props.init}>Cancelar</button>
                </div>
            </form>
        )
    }
}

BillingCycleForm = reduxForm({ form: 'billingCycleForm', destroyOnUnmount: false })(BillingCycleForm)
const selector = formValueSelector('billingCycleForm')
const mapStateToPros = state => ({ credits: selector(state, 'credits'), debts: selector(state, 'debts') })
const mapDispatchToProps = dispatch => bindActionCreators({ init }, dispatch)
export default connect(mapStateToPros, mapDispatchToProps)(BillingCycleForm)