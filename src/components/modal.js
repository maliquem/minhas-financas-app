import { Dialog } from 'primereact/dialog'
import React from 'react'

export default function Modal(props) {
    return (
        <Dialog header={props.header} 
                footer={props.footer}                                     
                visible={props.visibleDialog}                                    
                breakpoints={{'960px': '75vw', '640px': '100vw'}}
                style={{width: '925px', height: '486px', margin: '0px'}}                                     
                onHide={props.onHide}>
            {props.children}
        </Dialog>
    )
}