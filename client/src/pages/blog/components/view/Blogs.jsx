import React, { useEffect, useState } from "react";
import { Loader } from "../../../../components/loader/Loader";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteBlogInfo,
  getBlogInfo,
  searchBlogInfo,
  setSearchInfo,
} from "../../../../store/slices/blogSlice";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { API_BASE_URL } from "../../../../apis/config";
import Button from "../../../../components/inputs/Button";
import { Pagination } from "../pagination/Pagination";
import moment from "moment";
import "./Blogs.scss";

const Blogs = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();

  const searchParams = new URLSearchParams(location.search);
  const currentPage = parseInt(searchParams.get("page")) || 1;
  console.log(currentPage);

  useEffect(() => {
    dispatch(getBlogInfo({ page: currentPage }));
  }, [dispatch, currentPage]);

  const { getLoading, getInfo, searchInfo } = useSelector(
    (state) => state.blog
  );
  const data = searchInfo === null ? getInfo?.data?.data : searchInfo?.data;

  const handlePageChange = (page) => {
    page === 1 ? searchParams.delete("page") : searchParams.set("page", page);
    navigate(`${location.pathname}?${searchParams.toString()}`);
  };

  const [search, setSearch] = useState("");

  const handleSearch = () => {
    const keyword = {
      search: search,
    };

    if (keyword.search) {
      dispatch(searchBlogInfo({ keyword }));
    } else {
      dispatch(setSearchInfo());
    }
  };

  return (
    <div className="bloginfo">
      <div className="bloginfo__top">
        <input
          type="text"
          placeholder="Search by Title, Description"
          onChange={(e) => setSearch(e.target.value)}
        />
        <Button text="Search" onClick={handleSearch} />
      </div>
      {getLoading && data ? (
        <Loader />
      ) : !data?.length ? (
        <p>There is no available data!</p>
      ) : (
        data?.map(
          ({ id, title, description, images, created_at, updated_at }) => {
            return (
              <div className="bloginfo__card" key={id}>
                <div className="bloginfo__card-redirects">
                  <Link
                    className="bloginfo__card-redirects-view"
                    to={`view/${id}`}
                  >
                    View
                  </Link>
                  <Link
                    className="bloginfo__card-redirects-edit"
                    to={`edit/${id}`}
                  >
                    Edit
                  </Link>
                  <button
                    className="bloginfo__card-redirects-delete"
                    onClick={() => dispatch(deleteBlogInfo({ id }))}
                  >
                    Delete
                  </button>
                </div>
                <div className="bloginfo__card-imgs">
                  {images &&
                    JSON.parse(images?.name)
                      .slice(0, 1)
                      .map((el) => {
                        return (
                          <img
                            key={el}
                            src={API_BASE_URL + `/images/` + el}
                            alt="img"
                          />
                        );
                      })}
                </div>

                <div className="bloginfo__content">
                  <div className="bloginfo__content-top">
                    <h4>{title}</h4>

                    <span># {id}</span>
                  </div>

                  <p>{description}</p>

                  <div className="bloginfo__content-date">
                    <span>Created - {moment(created_at).fromNow()}</span>
                    <span>Updated - {moment(updated_at).fromNow()}</span>
                  </div>
                </div>
              </div>
            );
          }
        )
      )}

      {!searchInfo && (
        <Pagination
          currentPage={getInfo?.data?.current_page}
          lastPage={getInfo?.data?.last_page}
          setPage={handlePageChange}
        />
      )}
    </div>
  );
};

export default Blogs;
