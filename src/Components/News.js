import React, { Component } from "react";
import NewsItem from "./NewsItem";
import Spinner from "./Spinner";
import PropTypes from "prop-types";
import InfiniteScroll from "react-infinite-scroll-component";

export class News extends Component {
  static defaultProps = {
    country: "in",
    pageSize: 8,
    category: "general",
  };

  static protoTypes = {
    country: PropTypes.string,
    pageSize: PropTypes.int,
    category: PropTypes.string,
  };

  constructor(props) {
    super(props);
    this.state = {
      articles: [], // Initialize articles as an empty array
      loading: true, // Set loading to true initially
      page: 1,
      pageSize: this.props.pageSize,
      totalResults: 0,
    };
    document.title = `${this.capitalize(this.props.category)} - News Headlines`;
  }

  async updateNews() {
   
    let url = `https://newsapi.org/v2/top-headlines?q=${
      this.state.keyword ? this.state.keyword : ""
    }&country=${this.props.country}&category=${
      this.props.category
    }&apiKey=${this.props.apiKey}&page=${
      this.state.page
    }&pageSize=${this.state.pageSize}`;
    this.setState({ loading: true });
    let data = await fetch(url);
    let parseData = await data.json();
    this.setState({
      articles: parseData.articles,
      loading: false,
      totalResults: parseData.totalResults,
    });
  }
  // 937e2dc7aaa94060b31385c4bb8311df
  async componentDidMount() {
  
    this.updateNews();
  }

  handleNextClick = async () => {
  
    this.setState({ page: this.state.page + 1 });
   
  };
  handlePrevClick = async () => {
   
    this.setState({ page: this.state.page - 1 });
    
  };

  handleKeywordSearch = (event) => {
    this.setState({ keyword: event.target.value });
   
  };

  capitalize = (str) => {
    if (!str || str.length === 0) {
      return "";
    }
    return str.charAt(0).toUpperCase() + str.slice(1);
  };

  fetchMoreData = async () => {
    this.setState({ page: this.state.page + 1 });
    let url = `https://newsapi.org/v2/top-headlines?q=${
      this.state.keyword ? this.state.keyword : ""
    }&country=${this.props.country}&category=${
      this.props.category
}&apiKey=${this.props.apiKey}&page=${
      this.state.page
    }&pageSize=${this.state.pageSize}`;
    this.setState({ loading: true });
    let data = await fetch(url);
    let parseData = await data.json();
    this.setState({
      articles: this.state.articles.concat(parseData.articles),
      loading: false,
      totalResults: parseData.totalResults,
    });
  };

  render() {
    return (
      <div className="container my-3">
        <h2 className="my-4 text-center">
          Top News Headlines from {this.capitalize(this.props.category)}
        </h2>
       

        {this.state.loading && <Spinner />}
        <InfiniteScroll
          dataLength={this.state.articles.length}
          next={this.fetchMoreData}
          hasMore={this.state.articles.length !== this.state.totalResults}
          loader={<Spinner />}
        >
          <div className="container">
            <div className="row">
              {
               
                this.state.articles.map((element) => {
              
                  return (
                    <div className="col-md-3 col-sm-3 my-3" key={element.url}>
                      <NewsItem
                        fullTitle={element.title ? element.title : ""}
                        title={element.title ? element.title.slice(0, 35) : ""}
                        description={
                          element.description
                            ? element.description.slice(0, 100)
                            : ""
                        }
                        imageURL={
                          element.urlToImage
                            ? element.urlToImage
                            : "https://findusonweb.com/files/master/10423.jpg"
                        }
                        newsURL={element.url}
                        author={element.author}
                        date={element.publishedAt}
                        source={element.source.name}
                      />
                    </div>
                  );
                })
              }
            </div>
          </div>
        </InfiniteScroll>
       
      </div>
    );
  }
}

export default News;
