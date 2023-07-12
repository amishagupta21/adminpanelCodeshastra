import React, { useState, useEffect } from "react"
import axios from "axios"

const DropdownPagination = (props) => {
  const [posts, setPosts] = useState([])
  const [pageSize, setPageSize] = useState(10) // Initial page size
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(0)

  useEffect(() => {
    fetchPosts()
  }, [currentPage, pageSize])

  const fetchPosts = async () => {
    try {
      const response = await axios.get(
        `https://api.example.com/posts?_page=${currentPage}&_limit=${pageSize}`
      )

      setPosts(response.data)
      const totalPosts = response.headers["x-total-count"]
      setTotalPages(Math.ceil(totalPosts / pageSize))
    } catch (error) {
      console.error(error)
    }
  }

  const handlePageSizeChange = event => {
    const newSize = parseInt(event.target.value)
    setPageSize(newSize)
    setCurrentPage(1) // Reset to first page when page size changes
  }

  const handlePageChange = newPage => {
    setCurrentPage(newPage)
  }

  return (
    <div>
      <div>
        Page Size:
        <select value={pageSize} onChange={handlePageSizeChange}>
          <option value="5">5</option>
          <option value="10">10</option>
          <option value="20">20</option>
        </select>
      </div>
      <ul>
        {posts.map(post => (
          <li key={post.id}>{post.title}</li>
        ))}
      </ul>
      <div>
        {Array.from({ length: totalPages }, (_, index) => index + 1).map(
          page => (
            <button
              key={page}
              onClick={() => handlePageChange(page)}
              disabled={page === currentPage}
            >
              {page}
            </button>
          )
        )}
      </div>
    </div>
  )
}

export default DropdownPagination
