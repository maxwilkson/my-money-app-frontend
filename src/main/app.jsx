import React from 'react'
import Messages from '../commom/msg/messages'
import '../commom/template/dependencies'
import Footer from '../commom/template/footer'
import Header from '../commom/template/header'
import SideBar from '../commom/template/sideBar'

export default props => (
    <div className="wrapper">
        <Header />
        <SideBar />
        <div className="content-wrapper">
            {props.children}
        </div>
        <Footer />
        <Messages />
    </div>
)