(window.webpackJsonp=window.webpackJsonp||[]).push([[12],{104:function(e,t,a){},115:function(e,t,a){"use strict";a.r(t);var r=a(20),s=a(4),o=a(13),n=a(6),i=a(5),l=a(7),c=a(3),m=a(0),d=a.n(m),p=a(14),u=a(15),h=a(18),g=function(e){var t=p.c.getImageSize(e.imageUrl),a=p.c.isRoot(),r=e.userId===p.c.getUserId();return d.a.createElement("li",null,d.a.createElement("div",{id:"container"},d.a.createElement("article",{className:"card ",id:"contauner"},d.a.createElement("div",{className:"media"},d.a.createElement("img",{className:t,src:e.imageUrl,alt:"pic1"})),d.a.createElement("div",{onClick:e.removePhoto.bind(void 0,e.id)},(a||r)&&d.a.createElement("div",{className:"btn fbPhotoCurationControl inner uiButtonGroup delete-button"},d.a.createElement("i",{className:"far fa-trash-alt "}))))))};a(104);a.d(t,"default",function(){return f});var f=function(e){function t(e){var a;return Object(s.a)(this,t),(a=Object(n.a)(this,Object(i.a)(t).call(this,e))).uploadFile=function(e){if(a.setState({error:"",msg:""}),a.state.file)if(a.state.file.size>=2e6)u.toast.error(d.a.createElement(h.d.errorToast,{text:"File size exceeds limit of 2MB."}),{position:u.toast.POSITION.TOP_RIGHT});else{var t=new FormData;t.append("file",a.state.file),t.append("loggedInUserId",a.state.id),console.log("loggedInUserId",a.state.id),fetch("https://kl-social-network.herokuapp.com/pictures/add",{method:"POST",headers:Object(r.a)({},a.getAuthHeader()),body:t}).then(function(e){return e.json()}).then(function(e){!0===e.success?(u.toast.success(d.a.createElement(h.d.successToast,{text:e.message}),{position:u.toast.POSITION.TOP_RIGHT}),a.props.loadAllPictures(a.props.id),a.setState({ready:!0})):u.toast.error(d.a.createElement(h.d.errorToast,{text:e.message}),{position:u.toast.POSITION.TOP_RIGHT})}).catch(function(e){console.error("Upload Pic Err:",e),u.toast.error(d.a.createElement(h.d.errorToast,{text:"Internal Server Error: ".concat(e.message)}),{position:u.toast.POSITION.TOP_RIGHT}),403===e.status&&"Your JWT token is expired. Please log in!"===e.message&&(localStorage.clear(),a.props.history.push("/login"))})}else u.toast.error(d.a.createElement(h.d.errorToast,{text:"Please upload a file."}),{position:u.toast.POSITION.TOP_RIGHT})},a.getAuthHeader=function(){var e=localStorage.getItem("token");return e&&e.length?{Authorization:"Bearer ".concat(e)}:{}},a.removePhoto=function(e,t){t.preventDefault();var r={loggedInUserId:p.c.getUserId(),photoToRemoveId:e};console.log("requestBody: ",r),p.b.post("/pictures/remove",r,function(e){console.log("RemovePicture response: ",e),e.success?(u.toast.success(d.a.createElement(h.d.successToast,{text:e.message}),{position:u.toast.POSITION.TOP_RIGHT}),a.props.loadAllPictures(a.props.id)):(console.log("error message: ",e.message),u.toast.error(d.a.createElement(h.d.errorToast,{text:e.message}),{position:u.toast.POSITION.TOP_RIGHT}))}).catch(function(e){console.error("Remove Picture err:",e),u.toast.error(d.a.createElement(h.d.errorToast,{text:"Internal Server Error: ".concat(e.message)}),{position:u.toast.POSITION.TOP_RIGHT}),403===e.status&&"Your JWT token is expired. Please log in!"===e.message&&(localStorage.clear(),a.props.history.push("/login"))})},a.onFileChange=function(e){a.setState({file:e.target.files[0],ready:!1},function(){return a.uploadFile()})},a.state={picturesArr:[],id:a.props.match.params.id,firstName:a.props.firstName,lastName:a.props.lastName,username:"",file:"",error:"",msg:"",ready:!0},a.uploadFile=a.uploadFile.bind(Object(c.a)(Object(c.a)(a))),a.onFileChange=a.onFileChange.bind(Object(c.a)(Object(c.a)(a))),a.removePhoto=a.removePhoto.bind(Object(c.a)(Object(c.a)(a))),a}return Object(l.a)(t,e),Object(o.a)(t,[{key:"componentDidMount",value:function(){var e=this.props.match.params.id;this.setState({id:e}),this.props.loadAllPictures(e)}},{key:"render",value:function(){var e=this;if(this.props.match.params.id!==this.props.id&&this.props.getUserToShowId(this.props.match.params.id),!this.state.ready)return d.a.createElement("h1",{className:"text-center pt-5 mt-5"},"Uploading File...");var t=p.c.isRoot(),a=this.props.id===p.c.getUserId();return d.a.createElement("section",{className:"galerry-section"},d.a.createElement("article",{className:"aside-article-photos"},d.a.createElement("div",{className:"gallery-article-intro"},d.a.createElement("div",{className:"gallery-aside-article-header"},d.a.createElement("div",{className:"aside-article-icon"},d.a.createElement("i",{className:"fas fa-images"})),d.a.createElement("h3",{className:"aside-article-title"},"Photos")),(t||a)&&d.a.createElement("div",{className:""},d.a.createElement("button",{className:"button update-info"},d.a.createElement("label",{id:"upload",htmlFor:"fileUpload"}," ADD PHOTO"),d.a.createElement("input",{id:"fileUpload",onChange:this.onFileChange,type:"file"})))),this.props.picturesArr.length>0?d.a.createElement(m.Fragment,null,d.a.createElement("hr",{className:"my-2 mb-4 mt-3 col-md-10 mx-auto"}),d.a.createElement("ul",{className:"grid-container"},this.props.picturesArr.map(function(t){return d.a.createElement(g,Object.assign({key:t.id,removePhoto:e.removePhoto},t,{userId:e.props.id}))}))):d.a.createElement(m.Fragment,null,d.a.createElement("hr",{className:"my-2 mb-5 mt-3 col-md-10 mx-auto"}),d.a.createElement("h3",{className:"text-center"},"There are no photos of ",d.a.createElement("span",{className:"username-gallery"},"".concat(this.props.firstName," ").concat(this.props.lastName)),"."),d.a.createElement("hr",{className:"my-2 mb-5 mt-3 col-md-10 mx-auto"}))))}}]),t}(m.Component)}}]);
//# sourceMappingURL=12.ac690f6f.chunk.js.map