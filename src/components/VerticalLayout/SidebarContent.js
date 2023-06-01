import PropTypes from "prop-types"
import React, { useEffect, useRef } from "react"

// //Import Scrollbar
import SimpleBar from "simplebar-react"

// MetisMenu
import MetisMenu from "metismenujs"
import { withRouter } from "react-router-dom"
import { Link } from "react-router-dom"

//i18n
import { withTranslation } from "react-i18next"

const SidebarContent = props => {
  const ref = useRef()
  // Use ComponentDidMount and ComponentDidUpdate method symultaniously
  useEffect(() => {
    let pathName = props.location.pathname

    if (pathName.includes("/learner-details")) {
      pathName = "/learner"
    } else if (pathName.includes("/application-details")) {
      pathName = "/application"
    }
    const initMenu = () => {
      new MetisMenu("#side-menu")
      let matchingMenuItem = null
      const ul = document.getElementById("side-menu")
      const items = ul.getElementsByTagName("a")
      for (let i = 0; i < items.length; ++i) {
        if (pathName === items[i].pathname) {
          matchingMenuItem = items[i]
          break
        }
      }
      if (matchingMenuItem) {
        activateParentDropdown(matchingMenuItem)
      }
    }
    initMenu()
  }, [props.location.pathname])

  useEffect(() => {
    ref.current.recalculate()
  })

  function scrollElement(item) {
    if (item) {
      const currentPosition = item.offsetTop
      if (currentPosition > window.innerHeight) {
        ref.current.getScrollElement().scrollTop = currentPosition - 300
      }
    }
  }

  function activateParentDropdown(item) {
    item.classList.add("active")
    const parent = item.parentElement

    const parent2El = parent.childNodes[1]
    if (parent2El && parent2El.id !== "side-menu") {
      parent2El.classList.add("mm-show")
    }

    if (parent) {
      parent.classList.add("mm-active")

      const parent2 = parent.parentElement

      if (parent2) {
        parent2.classList.add("mm-show") // ul tag
        parent2.classList.add("mm-active")
        const parent3 = parent2.parentElement // li tag

        if (parent3) {
          parent3.classList.add("mm-active") // li
          parent3.childNodes[0].classList.add("mm-active") //a
          const parent4 = parent3.parentElement // ul
          if (parent4) {
            parent4.classList.add("mm-show") // ul
            const parent5 = parent4.parentElement
            if (parent5) {
              parent5.classList.add("mm-show") // li
              parent5.childNodes[0].classList.add("mm-active") // a tag
            }
          }
        }
      }
      scrollElement(item)
      return false
    }
    scrollElement(item)
    return false
  }

  return (
    <React.Fragment>
      <SimpleBar className="h-100" ref={ref}>
        <div id="sidebar-menu">
          <ul className="metismenu list-unstyled" id="side-menu">
            <li className="menu-title">{props.t("Menu")}</li>
            <li>
              <Link to="/dashboard">
                <i className="bx bx-home-circle" />
                <span>{props.t("Dashboard")}</span>
              </Link>
            </li>
            <li>
              <Link to="/courses">
                <i className="bx bx-book-open" />
                <span>{props.t("Courses")}</span>
              </Link>
            </li>
            {/* <li>
              <Link to="/curriculum" className="disabled-link">
                <i className="bx bx-bar-chart-alt-2" />
                <span>{props.t("Curriculum")}</span>
              </Link>
            </li>
            <li>
              <Link to="/contentbank" className="disabled-link">
                <i className="bx bx-bar-chart-alt-2" />
                <span>{props.t("Content Bank")}</span>
              </Link>
            </li> */}
            <li>
              <Link to="/users">
                <i className="bx bx-user" />
                <span>{props.t("Users")}</span>
              </Link>
            </li>
            <li>
              <Link to="/learner">
                <i className="bx bx-user" />
                <span>{props.t("Learner")}</span>
              </Link>
            </li>
            <li>
              <Link to="/application">
                <i className="bx bx-user" />
                <span>{props.t("Application")}</span>
              </Link>
            </li>
            <li>
              <Link to="/payment">
                <i className="bx bx-user" />
                <span>{props.t("Payment")}</span>
              </Link>
            </li>
            <li>
              <Link to="/faq-configuration">
                <i className="bx bx-user" />
                <span>{props.t("FAQ Configuration")}</span>
              </Link>
            </li>
            <li>
              <Link to="/sms-email-templates">
                <i className="bx bx-bell" /> 
                <span>{props.t("SMS/Email Templates")}</span>
              </Link>
            </li>
            <li>
              <Link to="/batch">
                <i className="bx bx-user" /> 
                <span>{props.t("Batches")}</span>
              </Link>
            </li>
            <li>
              <Link to="/add-mentors">
                <i className="mdi mdi-account-plus" /> 
                <span>{props.t("Add Mentors")}</span>
              </Link>
            </li>
          </ul>
        </div>
      </SimpleBar>
    </React.Fragment>
  )
}

SidebarContent.propTypes = {
  location: PropTypes.object,
  t: PropTypes.any,
}

export default withRouter(withTranslation()(SidebarContent))
