import React from 'react'
import "./Footer.css"

const Footer = () => {
    return (
        <div className="main-footer" >
            <div className="container" >
                <div className="row" >
                    <p className="col-sm" align="center">
                        &copy;{new Date().getFullYear()} | BACK END DEVELOPMENT | Grace Feibe Pikirang |
                    </p>

                </div>

            </div>

        </div>
    )
}

export default Footer
