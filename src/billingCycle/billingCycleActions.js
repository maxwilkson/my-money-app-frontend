import axios from "axios";
import { toastr } from "react-redux-toastr";
import { initialize as initForm } from 'redux-form';
import { selectTab, showTabs } from '../commom/tab/tabActions';
const BASE_URL = 'http://localhost:3003/api'

const INIT_VALUES = { credits: [{}], debts: [{}] }

export function getList() {
    const request = axios.get(`${BASE_URL}/billingCycles`)
    return {
        type: 'BILLING_CYCLES_FETCHED',
        payload: request
    }
}

export function create(values) {
    return submit(values, 'post')
}

export function update(values) {
    return submit(values, 'put')
}

export function remove(values) {
    return submit(values, 'delete')
}

function submit(values, method) {
    return dispatch => {
        const id = values._id ? values._id : ''
        axios[method](`${BASE_URL}/billingCycles/${id}`, values)
            .then(resp => {
                toastr.success('Sucesso', 'Operação Realizada com Sucesso.')
                dispatch(
                    init()
                );
            }).catch(e => {
                e.response.data.errors.forEach(error => {
                    toastr.error('Erro', error)
                });
            })
    }
}

export function showUpdate(billingCycle) {
    return [
        showTabs('tabUpdate'),
        selectTab('tabUpdate'),
        initForm('billingCycleForm', billingCycle)
    ]
}

export function showDelete(billingCycle) {
    return [
        showTabs('tabDelete'),
        selectTab('tabDelete'),
        initForm('billingCycleForm', billingCycle)
    ]
}

export function init() {
    return [
        showTabs('tabList', 'tabCreate'),
        selectTab('tabList'),
        getList(),
        initForm('billingCycleForm', INIT_VALUES)
    ]
}