import React, {Component} from 'react'
import {bindActionCreators} from 'redux'
import {connect} from'react-redux'
import * as modalActions from "./modalActions";
import './reduxModalStyle.scss'

class ReduxModal extends Component{
    state = {show:''};
    componentDidMount(){
        document.body.addEventListener('keyup', this.keyupListener);
        if(this.props.reduxModal.open){
            this.state.open = true;
            const self = this;
            setTimeout(function () {
                self.state.show = ' in';
                self.setState(self.state);
            }, 0);

        }
    }
    componentWillUnmount(){
        document.body.removeEventListener('keyup', this.keyupListener)
    }
    keyupListener = (e) => {
        if(this.props.reduxModal.open && e.code==='Escape'){
            this.handleClose()
        }
    };
    componentWillReceiveProps(p){
        if(p.reduxModal.open != this.props.reduxModal.open) {
            let self = this;
            if(p.reduxModal.open) {
                this.state.open = true;
                setTimeout(function () {
                    self.state.show = ' in';
                    self.setState(self.state);
                }, 0);
            }else{
                self.state.show = ' out';
                setTimeout(() => {
                    self.state.open = false;
                    self.setState(self.state, ()=>{
                    })
                },300)
            }
        }
    }
    handleClose = () => {
        this.props.modalActions.close();
        if(this.props.reduxModal.options.onClose){
            this.props.reduxModal.options.onClose(self)
        }

    };
    handleClickBg = (e) => {
        if(e.target===e.currentTarget){
            this.handleClose()
        }
    };
    handleClickYes = (e) => {
        if(this.props.reduxModal.options.onClickYes){
            this.props.reduxModal.options.onClickYes(e, this)
        }
    };
    handleClickNo = (e) => {
        if(this.props.reduxModal.options.onClickNo){
            this.props.reduxModal.options.onClickNo(e, this)
        }
    };
    render(){
        const rm = this.props.reduxModal;
        const o = rm.options;
        const p = this.props;
        if(this.state.open){
//            let src;
            // if(o.type === 'error'){
            //     src = '../../img/basket/no-register/eyes.png'
            // }if(o.type === 'yes-no'){
            //     src = '../../img/basket/no-register/eyes.png'
            // }else{
            //     src = '../../img/basket/no-register/eyes_happy.png'
            // }
            let containerClass;
            if(!o.containerClass){
                containerClass = " modal-office"
            }else{
                containerClass = ' ' + o.containerClass;
            }
            let caption;
            if(!(caption = o.caption)){
                if(o.type=='error') {
                    caption = "Нам очень жаль...";
                }else{
                    caption = "Все получилось!"
                }
            }
            let contentStyle = {};
            if(o.contentStyle){
                contentStyle = o.contentStyle;
            }
            let bodyStyle = {};
            if(o.bodyStyle){
                bodyStyle = o.bodyStyle;
            }
            return(
                <div className={'modal fade show '+this.state.show + containerClass}
                     onClick={this.handleClickBg}
                     style={{backgroundColor:'rgba(1,1,1,0.4)'}}>
                    <div className="modal-dialog modal-lg"
                         style={{height:'90%', overflowY:'auto', WebkitOverflowScrolling:'touch'}}>
                        <div className="modal-content" style={contentStyle}>
                            {o.type=='custom'?
                                <div className={o.noBody?'':'modal-body'} style={bodyStyle}>
                                    {rm.content}
                                    <div className="text-right" style={{width:'100%'}}>
                                        {!o.noCloseButton &&
                                            <button type="button"
                                                    className={'btn btn-default' + (o.type === 'error' ? ' error' : '')}
                                                    onClick={this.handleClose}
                                                    data-dismiss="modal">{o.titleClose?o.titleClose:'Закрыть'}</button>
                                        }
                                    </div>
                                </div>:
                                <div className="modal-sub-content">
                                    {!o.noCaption &&
                                        <div className="modal-header">
                                            <p className={'modal-title' + (o.type === 'error' ? ' error' : '')}>{caption}</p>
                                        </div>
                                    }
                                    <div className="modal-body">
                                        {rm.content}
                                    </div>
                                    {(o.footer === undefined || o.footer) &&
                                        <div className="modal-footer">
                                            {o.type === 'yes-no' ?
                                                <span>
                                                    <span className="modal-error" title={rm.error}>{rm.error}</span>
                                                   <button className="btn btn-success"
                                                           title={o.titleYes}
                                                           onClick={this.handleClickYes}>{o.captionYes ? o.captionYes : 'Да'}</button>
                                                   <button className="btn btn-default"
                                                           title={o.titleNo}
                                                           onClick={this.handleClickNo}>{o.captionNo ? o.captionNo : 'Нет'}
                                                   </button>
                                                </span> :
                                                <span>
                                                    <span className="modal-error" title={rm.error}>{rm.error}</span>

                                                    <button type="button"
                                                            className={'btn btn-default' + (o.type === 'error' ? ' error' : '')}
                                                            onClick={this.handleClose}
                                                            data-dismiss="modal">{o.titleClose ? o.titleClose : 'Закрыть'}
                                                    </button>
                                                </span>

                                            }
                                        </div>
                                    }
                                </div>
                            }
                            {rm.progress && <div className="modal-progress"/>}
                        </div>
                    </div>
                </div>
            )
        }else{
            return null
        }
    }
}

function mapStateToProps(state){
    return {
        reduxModal:state.reduxModal
    }
}
function mapDispatchToProps(dispatch){
    return {
        modalActions: bindActionCreators(modalActions, dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ReduxModal)