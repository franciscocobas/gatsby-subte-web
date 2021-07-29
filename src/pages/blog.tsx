import { graphql, Link } from 'gatsby';
import { StaticImage } from 'gatsby-plugin-image';
import React from 'react';
import styled from 'styled-components';
import SEO from '../components/seo';

const StyledBlogPageContainer = styled.div`
  border-top: 1px solid var(--border-gray);
  .desktop-container {
    max-width: 1100px;
    margin: 3rem auto;
    display: grid;
    grid-template-columns: 1fr 1fr;
    column-gap: 10rem;
    .conversatorios-container {
      video {
        max-width: 100%;
      }
      h2 {
        margin: 1rem 0 1.5rem;
        font-size: 2.5rem;
      }
      .podcast-title {
        margin: 2rem 0;
      }
      .podcast-post-container {
        margin: 1rem 0;
        .author {
          font-family: 'HelveticaMedium';
          margin: 0.5rem 0;
        }
      }
    }
  }
`;

type PostType = {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
};

type PodcastPostType = PostType & {
  podcasts_fields: {
    autoraPodcast: string;
  };
};

type BlogPageTypes = {
  data: {
    blogPosts: {
      nodes: PostType[];
    };
    podcastsPosts: {
      nodes: PodcastPostType[];
    };
  };
};

const Blog = ({ data: { blogPosts, podcastsPosts } }: BlogPageTypes) => {
  return (
    <StyledBlogPageContainer>
      <SEO
        title='Blog'
        description='En este espacio presentamos reflexiones, podcasts, artículos y más contentido que hemos estado generando con la cooperativa.'
      />
      <div className='desktop-container'>
        <div className='conversatorios-container'>
          <video
            autoPlay
            muted
            controls
            poster='https://subtedesarrollo.xyz/wp-content/uploads/2021/07/Conversatorios_imagen.webp'
            src='https://subtedesarrollo.xyz/wp-content/uploads/2021/07/spot_conversatorios.mp4'
          ></video>
          <h2>Conversatorios subterráneos</h2>
          <p>
            Los Conversatorios Subterráneos son espacios donde nos proponemos
            reflexionar colectivamente sobre los principales problemas de la
            comunicación en las cooperativas, organizaciones sociales,
            culturales y políticas.
          </p>
          <div className='podcast-title'>
            <img />
            <h3>
              Los problemas de comunicación de las organizaciones populares
            </h3>
          </div>
          {podcastsPosts.nodes.map((post: PodcastPostType) => (
            <div className='podcast-post-container' key={post.id}>
              <h3>{post.title}</h3>
              <p className='author'>{post.podcasts_fields.autoraPodcast}</p>
              <p dangerouslySetInnerHTML={{ __html: post.excerpt }}></p>
              <Link to={`/${post.slug}`}>Leer</Link>
            </div>
          ))}
        </div>
        <div>
          <h2>Subsuelo. Apuntes cooperativos</h2>
          <p>
            Abrimos este espacio para registrar y compartir algunas reflexiones
            sobre nuestra experiencia cooperativa, sobre las experiencias de
            autogestión, los proyectos de trabajo, los procesos colaborativos,
            las tristezas y las alegrías que atravesamos en este espacio
            autogestionado que estamos creando.
          </p>
          {blogPosts.nodes.map((post: PostType) => (
            <div className='blog-post-container' key={post.id}>
              <h3>{post.title}</h3>
              <p dangerouslySetInnerHTML={{ __html: post.excerpt }}></p>
              <Link to={post.slug}>Leer</Link>
            </div>
          ))}
        </div>
      </div>
    </StyledBlogPageContainer>
  );
};

export default Blog;

export const query = graphql`
  query MyBlogPostQuery {
    blogPosts: allWpPost(
      filter: { categories: { nodes: { elemMatch: { slug: { eq: "blog" } } } } }
      sort: { fields: date, order: ASC }
    ) {
      nodes {
        id
        slug
        title
        excerpt
      }
    }
    podcastsPosts: allWpPost(
      filter: {
        categories: { nodes: { elemMatch: { slug: { eq: "podcasts" } } } }
      }
      sort: { fields: date, order: ASC }
    ) {
      nodes {
        id
        slug
        title
        excerpt
        podcasts_fields {
          autoraPodcast
        }
      }
    }
  }
`;
