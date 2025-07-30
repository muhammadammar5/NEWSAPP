import React, { Component } from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner';
import PropTypes from 'prop-types'
import InfiniteScroll from 'react-infinite-scroll-component';

export class News extends Component {
    static defaultProps = {
        country: 'us',
        pageSize: 8,
        category: 'general'

    }
    static propTypes = {
        country: PropTypes.string,
        pageSize: PropTypes.number,
        category: PropTypes.string,

    }

    capitalize = str => str.charAt(0).toUpperCase() + str.slice(1); //simple capatalize function

    constructor(props) { // run first
        super(props);
        console.log('constructor from News')
        this.state = { // to set state inside constructor
            articles: [],
            loading: true,
            page: 1,
            totalResults: 0
        }
        document.title = `${this.capitalize(this.props.category)}-Ammar News`;
    }
    async updateNews() {
        this.props.setProgress(10)
        const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=c552acf4716f49be8f4d8ea5938e6e42&page=${this.state.page}&pageSize=${this.props.pageSize}`
        this.setState({ loading: true })
        //using fetch api
        let data = await fetch(url) // it takes url as parameter,and returns promise
        this.props.setProgress(30)
        let parsedData = await data.json()
        this.props.setProgress(70)
        console.log(parsedData)
        this.setState({ articles: parsedData.articles, totalResults: parsedData.totalResults, loading: false, }) // works same as hook
        this.props.setProgress(100)
    }
    async componentDidMount() // always run after render function
    {
        this.updateNews();
    }

    handleNext = async () => { //checks if there is next page or not
        this.setState({ page: this.state.page + 1 })
        this.updateNews();

    }
    handlePrevious = async () => {
        this.setState({ page: this.state.page - 1 })
        this.updateNews();
    }
    fetchMoreData = async () => {
        this.setState({ page: this.state.page + 1 })
        const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=c552acf4716f49be8f4d8ea5938e6e42&page=${this.state.page}&pageSize=${this.props.pageSize}`

        //using fetch api
        let data = await fetch(url) // it takes url as parameter,and returns promise
        let parsedData = await data.json()
        console.log(parsedData)
        this.setState({ articles: this.state.articles.concat(parsedData.articles), totalResults: parsedData.totalResults })

    };
    render() {
        return (
            <>
                <h2 className='text-center mb-4' style={{ margin: '35px 0px' }}>Top Headlines - From {this.capitalize(this.props.category)}</h2>
                {/*   {this.state.loading && <Spinner />} */}
                <InfiniteScroll
                    dataLength={this.state.articles.length}
                    next={this.fetchMoreData}
                    hasMore={this.state.articles.length !== this.state.totalResults}
                    loader={<Spinner />}
                >
                    <div className="container">
                        <div className="row">
                            {this.state.articles.map((element) => { // we will iterate articles using map
                                return <div className="col-md-4" key={element.url} >
                                    <NewsItem title={element.title ? element.title.slice(0, 45) : ""} description={element.description ? element.description.slice(0, 88) : ""} imageUrl={element.urlToImage} newsUrl={element.url} author={element.author} date={element.publishedAt} source={element.source.name} />
                                </div>
                            })}
                        </div>
                    </div>
                </InfiniteScroll>
                {/* <div className='container d-flex justify-content-between'>
                    <button disabled={this.state.page <= 1} type="button" className="btn btn-dark" onClick={this.handlePrevious}>&larr;Previous</button>
                    <button disabled={this.state.page + 1 > Math.ceil(this.state.totalResults / this.props.pageSize)} type="button" className="btn btn-dark" onClick={this.handleNext}>Next &rarr;</button>

                </div> */}
            </>
        )
    }
}

export default News
//c552acf4716f49be8f4d8ea5938e6e42
