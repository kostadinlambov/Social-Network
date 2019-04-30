import React, { Fragment } from 'react';
import { NavLink } from 'react-router-dom';
import PictureSideBar from './PictureSideBar';

const PhotoGallery = (props) => {
    return (
        <Fragment >
            <article className="aside-article-photos">
                <div className="aside-article-header">
                    <div className="aside-article-icon">
                        <i className="fas fa-images"></i>
                    </div>
                    < NavLink className="friends " exact to={`/home/gallery/${props.timeLineUserId}`}>
                        <h3 className="aside-article-title" style={{ color: ' #333' }}>
                            Photos &bull; {props.picturesArr.length}
                        </h3>
                    </NavLink>
                </div>
                
                <div className="hr-styles" style={{'width': '90%'}}></div>

                <ul className="aside-article-gallery bender-photos">
                    {props.picturesArr.map((picture) => <PictureSideBar key={picture.id}  {...picture} />)}
                </ul>
            </article>
        </Fragment >
    )
}

export default PhotoGallery;
