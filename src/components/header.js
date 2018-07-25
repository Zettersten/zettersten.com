import React from 'react'
import Link from 'gatsby-link'

const Header = ({ siteTitle }) => (
  <div>
    <div>
      <h1 style={{ margin: '140px auto 0', textAlign: 'center', textDecoration: 'none' }}>
        <Link to="/">
          {siteTitle}
        </Link>
      </h1>
    </div>
  </div>
)

export default Header
