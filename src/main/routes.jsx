import React from 'react'
import { hashHistory, IndexRoute, Redirect, Route, Router } from 'react-router'
import BillingCycle from '../billingCycle/billingCycle'
import Dashboard from '../dashboard/dashboard'
import AuthOrApp from './authOrApp'

export default props => (
    <Router history={hashHistory}>
        <Route path='/' component={AuthOrApp}>
            <IndexRoute component={Dashboard} />
            <Route path='billingCycles' component={BillingCycle} />
        </Route>
        <Redirect from='*' to='/' />
    </Router>
)
