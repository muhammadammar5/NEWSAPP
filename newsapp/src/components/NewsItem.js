import React, { Component } from 'react'

export class NewsItem extends Component {

    render() {
        let { title, description, imageUrl, newsUrl, author, date, source } = this.props //this.props is an object and we are destructuring it,news.js will pass props to news item
        return (
            <div className='my-3'>
                <div className="card mx-auto mb-3" >
                    <div style={{display:'flex',justifyContent:'flex-end',position:'absolute',right:'0'}}>  <span className="badge rounded-pill  mb-20  bg-primary">
                        {source}

                    </span></div>

                    <img
                        src={!imageUrl ? "https://www.thedailybeast.com/resizer/v2/J5SQOPX4FBGW3FOZT2PI64GDLM.JPG?smart=true&auth=34011c4e753b1bf2f7257e6563a11414e15a83c4444e7848b891e258c122234c&width=1200&height=630" : imageUrl}
                        className="card-img-top"
                        alt="..."
                    />

                    <div className="card-body">
                        <h5 className="card-title">{title}
                        </h5>
                        <p className="card-text">{description}</p>
                        <p className="card-text"><small className="text-body-secondary">By {!author ? "unknown" : author} on {new Date(date).toGMTString()}</small></p>
                        <a href={newsUrl} target='_blank' rel="noopener noreferrer" className="btn btn-sm btn-dark">Read More</a>
                    </div>
                </div>
            </div>
        )
    }
}

export default NewsItem
