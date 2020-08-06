import React from "react"
import { Link } from "gatsby"
import { graphql } from "gatsby"

import { Layout, Menu, Row, Col, Grid, Tag, Typography } from "antd"
const { useBreakpoint } = Grid
const { Title } = Typography

import "../../theme/styles.less"
const { Header, Footer, Sider, Content } = Layout

import { Button } from "antd"

export default ({ pageContext, data }) => {
    let screens = useBreakpoint()
    // let temp = Object.entries(screens).filter(screen => !!screen[1])
    // let current = temp[temp.length - 1][0]
    // // let current = 2
    return (
        <Layout>
            <Header>
                IK-PRESS <Button type="danger">Login</Button>
            </Header>

            <Content>
                <Row gutter={[16, 16]}>
                    <Col xs={{ span: 24 }} style={{ backgroundColor: "teal" }}>
                        <div className="container">
                            <Button type="primary" className="test2">
                                TEST2
                            </Button>
                            <Title>h1. Ant Design</Title>
                            <Title level={2}>h2. Ant Design</Title>
                            <Title level={3}>h3. Ant Design</Title>
                            <Title level={4}>h4. Ant Design</Title>
                        </div>
                    </Col>
                </Row>
                <Row gutter={[16, 16]}>
                    <Col xs={{ span: 12 }} style={{ backgroundColor: "teal" }}>
                        <div
                            style={{
                                fontSize: "10px",
                                backgroundColor: "#345",
                                color: "#eee",
                                overflow: "hidden",
                                // padding: "1rem",
                            }}
                        >
                            <pre>
                                <b>Template:</b> {__filename}
                            </pre>
                            <pre>
                                <b>Page context:</b>
                                <br />
                                {JSON.stringify(pageContext, null, 2)}
                            </pre>
                            <pre>
                                <b>Page data:</b>
                                <br />
                                {JSON.stringify(data, null, 2)}
                            </pre>
                        </div>
                    </Col>
                    <Col
                        xs={{ span: 12 }}
                        style={{ backgroundColor: "tomato" }}
                    >
                        {data.allWpPost.nodes.map(node => (
                            <>
                                <div key={`${node.uri}+${node.title}`}>
                                    <Link to={node.uri}>{node.title}</Link>
                                </div>
                                {/* <div dangerouslySetInnerHTML={{ __html: node.content }} /> */}
                            </>
                        ))}
                        {!pageContext.isFirstArchivePage &&
                        pageContext.previousArchivePath ? (
                            <Link to={pageContext.previousArchivePath}>
                                previous
                            </Link>
                        ) : null}
                        {!pageContext.isLastArchivePage &&
                        pageContext.nextArchivePath ? (
                            <Link to={pageContext.nextArchivePath}>next</Link>
                        ) : null}
                    </Col>
                </Row>
            </Content>
            <Footer>Footer</Footer>
        </Layout>
    )
}

export const query = graphql`
    query PostArchive(
        $archiveNodeIds: [String]!
        $sortOrder: [SortOrderEnum]!
        $sortFields: [WpPostFieldsEnum]!
    ) {
        allWpPost(
            filter: { id: { in: $archiveNodeIds } }
            sort: { order: $sortOrder, fields: $sortFields }
        ) {
            nodes {
                uri
                title
                content
            }
        }
    }
`
