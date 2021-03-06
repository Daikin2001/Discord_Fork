import React from 'react';
import PropTypes from 'prop-types';
import { ItemPropType } from './../proptypes';
import Card from './../components/Card';
import Cards from './../components/Cards';
import SiteLayout from './../components/SiteLayout';
import Loading from './../components/Loading';
import { graphql } from 'gatsby';

export default class BotsHomepage extends React.Component {
  constructor(props) {
    super(props);

    this.shuffleTheBots = this.shuffleTheBots.bind(this);

    if (typeof window === 'undefined') {
      this.state = {
        shuffle: this.shuffleTheBots()
      };
    } else {
      this.state = {
        shuffle: []
      };
    }
  }

  shuffleTheBots() {
    const seen = {};
    const items = this.props.data.allMarkdownRemark.edges.map((edge) => {
      edge.score = Math.random();
      if (edge.node.frontmatter.github) edge.score += 1;
      if (edge.node.fields.locale === this.props.pageContext.locale) edge.score += 10;
      return edge;
    })
      .sort((a, b) => b.score - a.score);

    const filtered = items.filter((item) => {
      if (seen.hasOwnProperty(item.node.fields.filename)) {
        return false;
      }
      seen[item.node.fields.filename] = true;
      return true;
    });

    return filtered;
  }

  componentDidMount() {
    this.setState({
      shuffle: this.shuffleTheBots()
    });
  }

  render() {
    return (
      <SiteLayout locale={this.props.pageContext.locale} type="bots">
        <Cards>
          { this.state.shuffle.length === 0 ? <Loading /> : this.state.shuffle.map(edge => <Card key={edge.node.fields.filename} post={edge.node}/>)}
        </Cards>
      </SiteLayout>
    );
  }
}

BotsHomepage.propTypes = {
  data: PropTypes.shape({
    allMarkdownRemark: PropTypes.shape({
      totalCount: PropTypes.number.isRequired,
      edges: PropTypes.arrayOf(
        PropTypes.shape({
          node: ItemPropType
        }).isRequired
      )
    })
  }),
  pageContext: PropTypes.shape({
    locale: PropTypes.string
  })
};

export const pageQuery = graphql`
  query BotsHomepageQuery {
    allMarkdownRemark(filter: {fields: {template: { eq: "bots" }}}) {
      totalCount
      edges {
        node {
          fields {
            filename
            template
            locale
            permalink
            filelink
          }
          frontmatter {
            avatar
            pagename
            description
            link
            nsfw
            github {
              owner
              repo
            }
          }
        }
      }
    }
  }
`;
