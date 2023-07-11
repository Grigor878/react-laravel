import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { editBlogInfo, viewBlogInfo } from "../../../../store/slices/blogSlice";
import { Loader } from "../../../../components/loader/Loader";
import { useNavigate, useParams } from "react-router-dom";
import Button from "../../../../components/inputs/Button";
import moment from "moment";
import "./EditBlog.scss";
import { API_BASE_URL, getAxiosConfig } from "../../../../apis/config";
import baseApi from "../../../../apis/baseApi";
import { error, success } from "../../../../components/swal/swal";

const EditBlog = () => {
  const dispatch = useDispatch();
  const { id } = useParams();

  useEffect(() => {
    dispatch(viewBlogInfo({ id }));
  }, [dispatch, id]);

  const { viewInfo } = useSelector((state) => state.blog);
  //   console.log(viewInfo);

  const navigate = useNavigate();

  const data = viewInfo?.data[0];

  const [title, setTitle] = useState();
  const [description, setDescription] = useState();
  const [images, setImages] = useState(
    JSON.parse(viewInfo?.data[0]?.images?.name)
  );

  useEffect(() => {
    setTitle(data?.title);
    setDescription(data?.description);
  }, [data?.description, data?.title]);

  const removeImg = (el) => {
    // alert(`Clicked ${el}`);

    const updatedImages = images?.filter((image) => image !== el);
    setImages(updatedImages);
  };

  const handleSubmit = () => {
    const edited = {
      //   user_id: data?.user_id,
      title: title,
      description: description,
    };

    if (images?.length === 0) {
      return error("Upload Imgs!");
    }

    // // Append each image file to the FormData
    // for (let i = 0; i < images.length; i++) {
    //   formData.append(`images${[i]}`, images[i]);
    // }

    dispatch(editBlogInfo({ id, edited }));
    // .then((res) => {
    //   if (res.payload.status === true) {
    //     const formData = new FormData();

    //     images.forEach((file, index) => {
    //       formData.append(`file${index}`, file);
    //       formData.append("blog_id", id); // responsic stanal add i pes
    //     });

    //     baseApi
    //       .post("/api/uploadBlogImgs", formData, getAxiosConfig())
    //       .then((res) => {
    //         // success(res.data.message);
    //         console.log(res);
    //       })
    //       .catch((err) => {
    //         error(err.response.data.message);
    //       });
    //   }
    // });
  };

  return !data ? (
    <Loader />
  ) : (
    <div className="editBlog">
      <div className="container">
        <div>
          <div className="editBlog__header">
            <Button text="Go Back" onClick={() => navigate(-1)} />

            <p>Blog ID - # {data.id}</p>
          </div>

          <div className="editBlog__main">
            <div className="editBlog__main-inputs">
              <label>
                Title
                <input
                  type="text"
                  defaultValue={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
              </label>
              <label>
                Description
                <input
                  type="text"
                  defaultValue={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
              </label>

              <button className="submit-btn" onClick={handleSubmit}>
                Submit
              </button>
            </div>

            <div className="editBlog__main-imgs">
              {images?.map((el) => {
                return (
                  <div key={el} className="editBlog__main-imgs-block">
                    <img src={API_BASE_URL + `/images/` + el} alt={el} />
                    <button onClick={() => removeImg(el)}>X</button>
                  </div>
                );
              })}
            </div>

            <div className="editBlog__main-dates">
              <span>Created - {moment(data.created_at).fromNow()}</span>
              <span>Updated - {moment(data.updated_at).fromNow()}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditBlog;
