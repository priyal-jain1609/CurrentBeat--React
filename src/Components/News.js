import React, { Component } from "react";
import Newsitem from "./Newsitem";
import Spinner from './Spinner'; // Import Spinner with uppercase 'S'
import PropTypes from 'prop-types';
import InfiniteScroll from 'react-infinite-scroller';

export class News extends Component {
  static defaultProps = {
    country: 'in',
    pageSize: 8,
    category: "general",
  };

  static propTypes = {
    country: PropTypes.string,
    pageSize: PropTypes.number,
    category: PropTypes.string,
  };

  capitalize = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  constructor(props) {
    super(props);
    this.state = {
      articles: [],
      loading: true,
      page: 1,
      totalResults: 0,
    };
    document.title = `CurrentBeat - ${this.capitalize(this.props.category)}`;
  }

  async componentDidMount() {
    this.updateNews();
  }

  async updateNews() {
    const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=00e904620c944803affb5004a8f06a07&page=${this.state.page}&pageSize=${this.props.pageSize}`;
    this.setState({ loading: true });
    try {
      const data = await fetch(url);
      const parsedData = await data.json();
      if (parsedData.articles) {
        this.setState({
          articles: parsedData.articles,
          totalResults: parsedData.totalResults,
          loading: false
        });
      } else {
        this.setState({ loading: false });
      }
    } catch (error) {
      console.error("An error occurred while fetching the news:", error);
      this.setState({ loading: false });
    }
  }

  handlePrevClick = async () => {
    this.setState({ page: this.state.page - 1 }, this.updateNews);
  };

  handleNextClick = async () => {
    this.setState({ page: this.state.page + 1 }, this.updateNews);
  };

  fetchMoreData = async () => {
    const newPage = this.state.page + 1;
    this.setState({ page: newPage });
    const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=d093053d72bc40248998159804e0e67d&page=${newPage}&pageSize=${this.props.pageSize}`;
    try {
      const data = await fetch(url);
      const parsedData = await data.json();
      if (parsedData.articles) {
        this.setState({
          articles: this.state.articles.concat(parsedData.articles),
          totalResults: parsedData.totalResults
        });
      }
    } catch (error) {
      console.error("An error occurred while fetching more news:", error);
    }
  };

  render() {
    const { articles, loading, totalResults } = this.state;
    return (
      <div className="container my-3">
        <h2 className="text-center my-4">CurrentBeat - Top Headlines on {this.capitalize(this.props.category)}</h2>
        {loading && <Spinner />}
        <InfiniteScroll
          dataLength={articles ? articles.length : 0}
          next={this.fetchMoreData}
          hasMore={articles ? articles.length !== totalResults : false}
          loader={<Spinner />}
        >
          <div className="container">
            <div className="row">
              {articles && articles.map((element) => {
                return (
                  <div className="col-md-4" key={element.url}>
                    <Newsitem
                      title={element.title ? element.title.slice(0, 30) : ""}
                      description={element.description ? element.description.slice(0, 80) : ""}
                      imageUrl={element.urlToImage}
                      newsUrl={element.url}
                      author={element.author}
                      date={element.publishedAt}
                      source={element.source.name}
                    />
                  </div>
                );
              })}
            </div>
          </div>
        </InfiniteScroll>
      </div>
    );
  }
}

export default News;
