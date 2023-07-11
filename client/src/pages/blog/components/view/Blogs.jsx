import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteBlogInfo,
  getBlogInfo,
} from "../../../../store/slices/blogSlice";
import moment from "moment";
import { API_BASE_URL } from "../../../../apis/config";
import "./Blogs.scss";
import Button from "../../../../components/inputs/Button";
import { Loader } from "../../../../components/loader/Loader";

const Blogs = () => {
  const dispatch = useDispatch();

  const [page, setPage] = useState(1);

  useEffect(() => {
    dispatch(getBlogInfo({ page }));
  }, [dispatch, page]);

  const { getLoading, getInfo } = useSelector((state) => state.blog);

  const data = getInfo?.data.data;
  const itemsShow = getInfo?.data?.to;
  const items = getInfo?.data?.total;
  const currentPage = getInfo?.data?.current_page;
  const lastPage = getInfo?.data.last_page;
  console.log(getInfo?.data); //
  // console.log(items)//
  // console.log(lastPage)//

  return (
    <div className="bloginfo">
      <div className="bloginfo__top">
        <h3>
          {itemsShow}/{items}
        </h3>
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
                  {JSON.parse(images?.name)
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

      <div className="bloginfo__pagination">
        {currentPage !== 1 ? (
          <Button text="Previous" onClick={() => setPage((prev) => prev - 1)} />
        ) : null}
        {lastPage !== page ? (
          <Button text="Next" onClick={() => setPage((next) => next + 1)} />
        ) : null}
      </div>
    </div>
  );
};

export default Blogs;
