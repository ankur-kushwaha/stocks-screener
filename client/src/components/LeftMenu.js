import React from 'react'
import {
    Link
} from "react-router-dom";
import * as Icons from "react-icons/fi";


export default function LeftMenu() {
    let menuItems = [{
        title: "Home",
        icon: 'FiHome',
        link:"/list"
    }, {
        title: "Stocks to Buy",
        icon: 'FiTrendingUp',
        link:"/list/buy"
    },
    {
        title: "Stocks to Sell",
        icon: 'FiTrendingDown',
        link:"/list/sell"
    }, {
        title: "Stocks to Hold",
        icon: 'FiTriangle',
        link:"/list/hold"
    }].map(item => {
        item.icon = Icons[item.icon];
        return item;
    })

    return (
        <div className="left-menu">
            <div className="logo">
                <span className="title">
                    Stock Screener
                </span>
            </div>
            <div className="menu-items">
                {menuItems.map(item => {
                    let Icon = item.icon;
                    return (
                        <li className="item">
                            <Link to={item.link}>
                                <span className="icon">
                                    <Icon />
                                </span>
                                {item.title}
                            </Link>
                        </li>
                    )
                })}
            </div>
        </div>
    )
}
