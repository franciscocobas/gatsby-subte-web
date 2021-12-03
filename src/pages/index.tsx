import React from 'react';
import { graphql, Link, PageProps } from 'gatsby';
import { FileNode } from 'gatsby-plugin-image/dist/src/components/hooks';
import { Stack, useMediaQuery } from '@chakra-ui/react';

import SEO from '../components/seo';
import CustomWrappterGatsbyImage from '../components/CustomWrappterGatsbyImage';

type ProyectoType = {
  id: string;
  slug: string;
  title: string;
  datos_proyecto_portada: {
    imagenPortadaDesktop: {
      altText: string;
      sourceUrl: string;
      localFile: FileNode;
    };
    imagenPortadaMobile: {
      altText: string;
      sourceUrl: string;
      localFile: FileNode;
    };
  };
};

type IndexQueryProps = {
  proyectosPortada: {
    nodes: ProyectoType[];
  };
};

type IndexPageProps = PageProps<IndexQueryProps>;

const IndexPage = ({ data: { proyectosPortada } }: IndexPageProps) => {
  const [isLargerThan560] = useMediaQuery('(min-width: 560px)');

  return (
    <>
      <SEO />
      <Stack maxW="1440px" mx="auto">
        {proyectosPortada.nodes.length > 0 &&
          proyectosPortada.nodes.map((project: ProyectoType) => (
            <Link
              key={project.slug}
              aria-label={`Link a la página del proyecto de ${project.title}`}
              to={`/proyectos/${project.slug}`}
            >
              {isLargerThan560
                ? project.datos_proyecto_portada.imagenPortadaDesktop && (
                    <CustomWrappterGatsbyImage
                      altText={project.datos_proyecto_portada.imagenPortadaDesktop.altText}
                      localFile={project.datos_proyecto_portada.imagenPortadaDesktop.localFile}
                    />
                  )
                : project.datos_proyecto_portada.imagenPortadaMobile && (
                    <CustomWrappterGatsbyImage
                      altText={project.datos_proyecto_portada.imagenPortadaMobile.altText}
                      localFile={project.datos_proyecto_portada.imagenPortadaMobile.localFile}
                    />
                  )}
            </Link>
          ))}
      </Stack>
    </>
  );
};

export default IndexPage;

export const query = graphql`
  query MyIndexQuery {
    proyectosPortada: allWpPost(
      filter: { categories: { nodes: { elemMatch: { slug: { eq: "proyectos-portada" } } } } }
      sort: { fields: date, order: DESC }
    ) {
      nodes {
        id
        slug
        title
        datos_proyecto_portada {
          imagenPortadaDesktop {
            sourceUrl
            altText
            localFile {
              childImageSharp {
                gatsbyImageData
              }
            }
          }
          imagenPortadaMobile {
            sourceUrl
            altText
            localFile {
              childImageSharp {
                gatsbyImageData
              }
            }
          }
        }
      }
    }
  }
`;
