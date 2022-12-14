import React, { useCallback, useEffect, useRef, useState } from "react";
import Axios from "../Axios/Axios";
import { useParams, useNavigate } from "react-router-dom";
import { useDropzone } from "react-dropzone";
import Cropper from "react-easy-crop";
import getCroppedImg from "./CropImage";
import { motion } from "framer-motion";
import ReactPlayer from "./ReactPlayer";
import DropZone from "./DropZone";

const SingleFolder = () => {
  const playerRef = useRef();
  const navigate = useNavigate();
  const { id } = useParams();
  const [blobUrl, setblobUrl] = useState();
  const [fileType, setfileType] = useState();
  const [showDropzone, setshowDropzone] = useState(false);
  const [showDropdown, setshowDropdown] = useState(false);
  const [progress, setprogress] = useState(0);
  const [EditForm, setEditForm] = useState(false);
  const [ChannelList, setChannelList] = useState([]);
  const [FormDatas, setFormDatas] = useState({
    title: "",
    description: "",
    _id: "",
    channelInput: "",
    channels: [],
  });
  const { title, description, _id, channels, channelInput } = FormDatas;
  const [Files, setFiles] = useState([]);
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);
  const [showDesc, setshowDesc] = useState([]);
  const onCropComplete = useCallback((croppedArea, croppedAreaPixels) => {
    setCroppedAreaPixels(croppedAreaPixels);
  }, []);
  useEffect(() => {
    ShowFiles();
    showChannelList();
  }, []);
  const ShowFiles = async () => {
    const config = {
      headers: {
        token: JSON.parse(localStorage.getItem("accessToken")),
      },
    };
    const res = await Axios.get(`/open/folder/${id}`, config);
    setFiles(res.data.news);
  };
  const showChannelList = async () => {
    const config = {
      headers: {
        token: JSON.parse(localStorage.getItem("accessToken")),
      },
    };
    const res = await Axios.get("/channel", config);
    setChannelList(res.data);
  };
  const { acceptedFiles, getRootProps, getInputProps } = useDropzone({
    onDrop: (acceptedFiles) => {
      setblobUrl(URL.createObjectURL(acceptedFiles[0]));
      setfileType(acceptedFiles[0].type.split("/")[0]);
    },
  });
  const handleDropzoneSubmit = useCallback(async () => {
    if (
      blobUrl &&
      fileType &&
      title &&
      description &&
      channels.length > 0 &&
      true
    ) {
      if (fileType === "image") {
        var croppedImage = await getCroppedImg(blobUrl, croppedAreaPixels);
        var file = await fetch(croppedImage)
          .then((r) => r.blob())
          .then(
            (blobFile) =>
              new File([blobFile], "croppedImage.png", { type: "image" })
          );
      } else if (fileType === "video") {
        var croppedImage = blobUrl;
        var file = await fetch(blobUrl)
          .then((r) => r.blob())
          .then(
            (blobFile) => new File([blobFile], "video.mp4", { type: "video" })
          );
      } else {
        var croppedImage = blobUrl;
        var file = await fetch(blobUrl)
          .then((r) => r.blob())
          .then(
            (blobFile) => new File([blobFile], "audio.mp3", { type: "audio" })
          );
      }
      // file to formdata
      setshowDropzone(false);
      const formData = new FormData();
      formData.append("file", file);
      formData.append("title", title);
      formData.append("description", description);
      formData.append("folderId", id);
      formData.append("fileType", fileType);
      channels.map((channel) => formData.append("channels[]", channel._id));

      const res = await Axios.post(
        "/news",
        formData,
        {
          headers: {
            token: JSON.parse(localStorage.getItem("accessToken")),
            "Content-Type": "multipart/form-data",
          },
          onUploadProgress: (progressEvent) => {
            setprogress(
              parseInt(
                Math.round((progressEvent.loaded * 100) / progressEvent.total)
              )
            );
          },
        },
        []
      );
      setFormDatas({
        title: "",
        description: "",
        _id: "",
        channelInput: "",
        channels: [],
      });
      setblobUrl();
      setfileType();
      ShowFiles();
      setprogress(0);
    } else {
      alert("Please fill all the fields");
    }
  }, [
    croppedAreaPixels,
    blobUrl,
    fileType,
    title,
    description,
    id,
    Files,
    channels,
    channelInput,
  ]);
  const updateForm = useCallback(async () => {
    if (
      blobUrl &&
      fileType &&
      title &&
      description &&
      channels.length > 0 &&
      true
    ) {
      if (fileType === "image") {
        var croppedImage = await getCroppedImg(blobUrl, croppedAreaPixels);
        var file = await fetch(croppedImage)
          .then((r) => r.blob())
          .then(
            (blobFile) =>
              new File([blobFile], "croppedImage.png", { type: "image" })
          );
      } else if (fileType === "video") {
        var croppedImage = blobUrl;
        var file = await fetch(blobUrl)
          .then((r) => r.blob())
          .then(
            (blobFile) => new File([blobFile], "video.mp4", { type: "video" })
          );
      } else {
        var croppedImage = blobUrl;
        var file = await fetch(blobUrl)
          .then((r) => r.blob())
          .then(
            (blobFile) => new File([blobFile], "audio.mp3", { type: "audio" })
          );
      }
      // file to formdata
      setshowDropzone(false);
      const formData = new FormData();
      formData.append("file", file);
      formData.append("title", title);
      formData.append("description", description);
      formData.append("folderId", id);
      formData.append("fileType", fileType);
      formData.append("newsId", _id);
      channels.map((channel) => formData.append("channels[]", channel._id));

      const res = await Axios.put(
        "/news",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            token: JSON.parse(localStorage.getItem("accessToken")),
          },
          onUploadProgress: (progressEvent) => {
            setprogress(progressEvent.loaded / progressEvent.total);
          },
        },
        []
      );
      // setFiles([...Files, { fileType: fileType, title: title, description: description, file: croppedImage }]);
      setFormDatas({
        title: "",
        description: "",
        _id: "",
        channelInput: "",
        channels: [],
      });
      setblobUrl();
      setfileType();
      ShowFiles();
      setprogress(0);
    } else {
      alert("Please fill all the fields");
    }
  }, [
    croppedAreaPixels,
    blobUrl,
    fileType,
    title,
    description,
    id,
    Files,
    channels,
    channelInput,
  ]);
  const handleDropzone = () => {
    setshowDropzone(true);
  };
  const BackButton = async () => {
    const config = {
      headers: {
        token: JSON.parse(localStorage.getItem("accessToken")),
      },
    };
    const res = await Axios.get("/open/folder/" + id, config);
    navigate("/folderManagement");
  };
  const handleInput = (e) => {
    setFormDatas({ ...FormDatas, [e.target.name]: e.target.value });
  };
  const selectChannel = (id) => {
    if (!channels.find((channel) => channel._id === id)) {
      const channel = ChannelList.find((channel) => channel._id === id);
      setFormDatas((prev) => ({
        ...prev,
        channels: [...prev.channels, channel],
      }));
    }
    showChannelList();
  };
  const removeChannel = (id) => {
    const newChannels = channels.filter((channel) => channel._id !== id);
    setFormDatas({ ...FormDatas, channels: newChannels });
  };
  const deleteFile = async (fileId, i) => {
    if (window.confirm("Are you sure you want to delete this File?")) {
      const config = {
        headers: {
          token: JSON.parse(localStorage.getItem("accessToken")),
        },
      };
      await Axios.delete(`/news`, {
        data: { newsId: fileId, folderId: id },
        headers: config.headers,
      });

      ShowFiles();
    }
  };
  const editFile = async (fileId, i) => {
    const config = {
      headers: {
        token: JSON.parse(localStorage.getItem("accessToken")),
      },
    };
    const res = await Axios.get(`/news/${fileId}`, config);
    setblobUrl(res.data.file);
    setfileType(res.data.fileType);
    setFormDatas({
      title: res.data.title,
      description: res.data.description,
      _id: res.data._id,
      channels: res.data.channels,
      channelInput: "",
    });
    setshowDropzone(true);
    setEditForm(true);
  };
  const handlePlayerReady = (player) => {
    playerRef.current = player;
  };
  const showAndHideBtn = (id) => {
    if (showDesc.includes(id)) {
      setshowDesc(showDesc.filter((item) => item !== id));
    } else {
      setshowDesc([...showDesc, id]);
    }
  };
  const handleDropdown = () => {
    setTimeout(() => {
      setshowDropdown(false);
    }, 200);
  };
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: "100%" }}
      transition={{ duration: 0.5 }}
      style={{ width: "100%" }}
    >
      {!showDropzone && (
        <div className="container">
          <div className="showDropzone-container mt-2 mx-2">
            <button onClick={BackButton} className="btn btn-danger mx-2">
              <i className="bi bi-arrow-left-circle"> </i>
              Back
            </button>
            <button onClick={handleDropzone} className="btn btn-primary mx-2">
              <i className="bi bi-plus-circle-dotted"> </i>
              Add File
            </button>
          </div>
          {/* Show All File */}
          <div className="showAllFile-container mt-2 ">
            <div className="d-flex flex-wrap">
              {Files.length > 0 &&
                Files.map((file, index) => (
                  <div key={file._id} className="">
                    <div
                      className="card mt-1 mx-1"
                      style={{
                        width: "18rem",
                        height: file.fileType === "image" && "26rem",
                        height: file.fileType === "video" && "19rem",
                        height: file.fileType === "audio" && "13rem",
                      }}
                    >
                      {file.fileType === "video" && (
                        <div className="react-player">
                          <ReactPlayer
                            options={{
                              controls: true,
                              responsive: true,
                              fluid: true,
                              sources: [
                                {
                                  src: file.file,
                                  type: "video/mp4",
                                },
                              ],
                            }}
                            onReady={handlePlayerReady}
                          />
                        </div>
                      )}
                      {file.fileType === "image" && (
                        <img src={file.file} className="card-img-top" />
                      )}
                      {file.fileType === "audio" && (
                        <audio
                          src={file.file}
                          controls
                          className="card-img-top"
                        />
                      )}
                      <div className="card-body px-2 py-1">
                        <span
                          style={{
                            color: "grey",
                            fontSize: "12px",
                            textAlign: "center",
                          }}
                        >
                          by: {file.author.username}
                        </span>
                        {file.title.length > 20 ? (
                          <h5 className="card-title">
                            {file.title.slice(0, 20)}...
                          </h5>
                        ) : (
                          <h5 className="card-title">{file.title}</h5>
                        )}
                        <p className="card-text">
                          {showDesc.indexOf(file._id) !== -1
                            ? file.description + " "
                            : file.description.length < 34
                            ? file.description
                            : file.description.slice(0, 35) + "..."}
                          {file.description.length > 34 && (
                            <button
                              className="show-more"
                              onClick={() => showAndHideBtn(file._id)}
                            >
                              {showDesc.indexOf(file._id) !== -1
                                ? "Hide"
                                : "Show More"}
                            </button>
                          )}
                        </p>
                        <button
                          onClick={() => deleteFile(file._id, index)}
                          className="btn btn-danger mx-1"
                        >
                          Delete
                        </button>
                        <button
                          onClick={() => editFile(file._id, index)}
                          className="btn btn-primary mx-1"
                        >
                          Edit
                        </button>
                        <div className="dropdown">
                          <button
                            className="btn btn-secondary btn-sm dropdown-toggle py-2"
                            type="button"
                            data-bs-toggle="dropdown"
                            aria-expanded="false"
                          >
                            Channels
                          </button>
                          <ul className="dropdown-menu">
                            {file.channels.map((channel, i) => (
                              <li key={i} className="dropdown-item">
                                {channel.channelName}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </div>
      )}
      {showDropzone && (
        <DropZone
          setshowDropzone={setshowDropzone}
          blobUrl={blobUrl}
          fileType={fileType}
          progress={progress}
          getRootProps={getRootProps}
          getInputProps={getInputProps}
          handleInput={handleInput}
          title={title}
          description={description}
          channels={channels}
          channelInput={channelInput}
          setshowDropdown={setshowDropdown}
          handleDropdown={handleDropdown}
          showDropdown={showDropdown}
          ChannelList={ChannelList}
          selectChannel={selectChannel}
          removeChannel={removeChannel}
          EditForm={EditForm}
          updateForm={updateForm}
          handleDropzoneSubmit={handleDropzoneSubmit}
          handlePlayerReady={handlePlayerReady}
          Cropper={Cropper}
          crop={crop}
          setCrop={setCrop}
          zoom={zoom}
          setZoom={setZoom}
          onCropComplete={onCropComplete}
          acceptedFiles={acceptedFiles}
        />
      )}
    </motion.div>
  );
};

export default SingleFolder;
