// import React from 'react'
// import Container from 'react-bootstrap/Container'


type FooterProps = {}

export default function Footer({}: FooterProps) {
    return (
        <>
            <div className="bg-dark fixed-bottom">
                <div className='row mw-100 footer-vh text-center py-2 overflow-auto'>
                    <div className='col-6 ws-font'>
                        <p>
                        If you notice any issues, or have any recommendations, feel free to shoot me a message! 
                        </p>
                        <a href="https://www.linkedin.com/in/robertblindt/" target="_blank" rel="nofollow">
                            <img src="https://img.shields.io/badge/robertblindt-0A66C2?style=for-the-badge&logo=linkedin&logoColor=white"/>
                        </a>
                        <a href="mailto:robertjblindt@gmail.com?subject=[GitHub]%20Hello%20Robert" >    
                        <img src="https://img.shields.io/badge/robertjblindt@gmail.com-EA4335?style=for-the-badge&logo=gmail&logoColor=white"/></a>
                    </div>
                    <div className='col-6 ws-font'>
                        <p>
                        If you would like to take a look at whats going on under the hood, you can find the project here:
                        </p>
                        <a href="https://github.com/robertblindt/CommanderGrams-Directory" target="_blank" rel="nofollow">
                            <img src="https://img.shields.io/badge/CommanderGrams-181717?style=for-the-badge&logo=github&logoColor=white"/>
                        </a>
                        <a href="https://github.com/robertblindt" target="_blank" rel="nofollow">
                            <img src="https://img.shields.io/badge/RobertBlindt-181717?style=for-the-badge&logo=github&logoColor=white"/>
                        </a>
                    </div>
                </div>
            </div>
        </>
    )
}