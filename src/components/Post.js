import React, { useEffect, useState } from "react";
import { db, firebase } from "../firebase";
import {
  PostWrapper,
  Header,
  DisplayPhoto,
  DisplayUsername,
  Photo,
  CommentDP,
  Func,
  DisplayLikes,
  Caption,
  CommentInputContainer,
  CommentInput,
  CommentPost,
  CommentContainer,
  CommentBackButton,
} from "./componets";

const Like = (props) => {
  return (
    <svg
      onClick={props.onClick}
      aria-label="Like"
      class="_8-yf5 "
      fill={props.liked ? "red" : "black"}
      height="30"
      style={{ cursor: "pointer", paddingLeft: "0.4rem" }}
      role="img"
      viewBox="0 0 48 48"
      width="30"
    >
      {!props.liked ? (
        <path d="M34.6 6.1c5.7 0 10.4 5.2 10.4 11.5 0 6.8-5.9 11-11.5 16S25 41.3 24 41.9c-1.1-.7-4.7-4-9.5-8.3-5.7-5-11.5-9.2-11.5-16C3 11.3 7.7 6.1 13.4 6.1c4.2 0 6.5 2 8.1 4.3 1.9 2.6 2.2 3.9 2.5 3.9.3 0 .6-1.3 2.5-3.9 1.6-2.3 3.9-4.3 8.1-4.3m0-3c-4.5 0-7.9 1.8-10.6 5.6-2.7-3.7-6.1-5.5-10.6-5.5C6 3.1 0 9.6 0 17.6c0 7.3 5.4 12 10.6 16.5.6.5 1.3 1.1 1.9 1.7l2.3 2c4.4 3.9 6.6 5.9 7.6 6.5.5.3 1.1.5 1.6.5.6 0 1.1-.2 1.6-.5 1-.6 2.8-2.2 7.8-6.8l2-1.8c.7-.6 1.3-1.2 2-1.7C42.7 29.6 48 25 48 17.6c0-8-6-14.5-13.4-14.5z"></path>
      ) : (
        <path d="M34.6 3.1c-4.5 0-7.9 1.8-10.6 5.6-2.7-3.7-6.1-5.5-10.6-5.5C6 3.1 0 9.6 0 17.6c0 7.3 5.4 12 10.6 16.5.6.5 1.3 1.1 1.9 1.7l2.3 2c4.4 3.9 6.6 5.9 7.6 6.5.5.3 1.1.5 1.6.5s1.1-.2 1.6-.5c1-.6 2.8-2.2 7.8-6.8l2-1.8c.7-.6 1.3-1.2 2-1.7C42.7 29.6 48 25 48 17.6c0-8-6-14.5-13.4-14.5z"></path>
      )}
    </svg>
  );
};

const Commnet = (props) => {
  return (
    <svg
      aria-label="Comment"
      class="_8-yf5 "
      onClick={props.onClick}
      color="black"
      fill="black"
      style={{ cursor: "pointer", paddingLeft: "0.4rem" }}
      height="29"
      role="img"
      viewBox="0 0 48 48"
      width="29"
    >
      <path
        clip-rule="evenodd"
        d="M47.5 46.1l-2.8-11c1.8-3.3 2.8-7.1 2.8-11.1C47.5 11 37 .5 24 .5S.5 11 .5 24 11 47.5 24 47.5c4 0 7.8-1 11.1-2.8l11 2.8c.8.2 1.6-.6 1.4-1.4zm-3-22.1c0 4-1 7-2.6 10-.2.4-.3.9-.2 1.4l2.1 8.4-8.3-2.1c-.5-.1-1-.1-1.4.2-1.8 1-5.2 2.6-10 2.6-11.4 0-20.6-9.2-20.6-20.5S12.7 3.5 24 3.5 44.5 12.7 44.5 24z"
        fill-rule="evenodd"
      ></path>
    </svg>
  );
};

function Post(props) {
  const { photoURL, username, DP, caption, Likers, commets, id } = props.Data;
  const Likes = Likers.length;
  const [showComment, setShowComment] = useState(false);
  const [showFullCaption, setShowFullCaption] = useState(false);
  const [isLiked, setLike] = useState(false);
  const [comment, setComment] = useState("");
  const { Username, userPhoto } = props.userData;

  useEffect(() => {
    Likers.map((name) => {
      if (name == username) {
        setLike(true);
      }
    });
  }, [isLiked]);
  const LikeFunc = () => {
    setLike(!isLiked);
    if (!isLiked) {
      db.collection("Posts")
        .doc(id)
        .update({
          Likers: firebase.firestore.FieldValue.arrayUnion(Username),
        });
    } else {
      db.collection("Posts")
        .doc(id)
        .update({
          Likers: firebase.firestore.FieldValue.arrayRemove(Username),
        });
    }
  };

  return (
    <PostWrapper>
      {!showComment ? (
        <>
          <Header>
            <DisplayPhoto src={DP} />
            <DisplayUsername>{username}</DisplayUsername>
          </Header>
          <Photo img={photoURL} onDoubleClick={() => LikeFunc()} />
          <Func>
            <Like onClick={() => LikeFunc()} liked={isLiked} />
            <Commnet onClick={() => setShowComment(true)} />
          </Func>
          <DisplayLikes>
            {Likes > 1
              ? `${Likes} likes`
              : `${Likes === 0 ? "No Likes" : `${Likes} like`}`}
          </DisplayLikes>
          <Caption>
            {!showFullCaption
              ? caption.length > 200
                ? `${caption.substring(0, 200)}`
                : caption
              : caption}
            {caption.length > 200 && (
              <span
                onClick={() => setShowFullCaption(!showFullCaption)}
                style={{ fontWeight: "bold", cursor: "pointer" }}
              >
                {!showFullCaption ? "...more" : "...less"}
              </span>
            )}
          </Caption>
          <CommentInputContainer>
            <CommentInput
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="Add a Comment"
            />
            <CommentPost
              onClick={() => {
                if (comment.trim() !== "") {
                  db.collection("Posts")
                    .doc(id)
                    .update({
                      commets: firebase.firestore.FieldValue.arrayUnion({
                        DP: userPhoto,
                        name: Username,
                        txt: comment,
                      }),
                    });
                  setComment("");
                }
              }}
              isEmpty={!comment}
            >
              POST
            </CommentPost>
          </CommentInputContainer>
        </>
      ) : (
        <>
          <div
            className="flexCenter"
            style={{
              width: "100%",
              height: "2rem",
              fontSize: "1.5rem",
              marginBottom: "0.2rem",
              borderBottom: "1.25px solid black",
            }}
          >
            Comments
          </div>
          {commets ? (
            commets.map((comment) => {
              return (
                <CommentContainer>
                  <CommentDP src={comment.DP} />
                  <div
                    style={{
                      paddingTop: "0.3rem",
                      paddingLeft: "0.5rem",
                      display: "flex",
                      flexDirection: "column",
                      maxWidth: "35rem",
                      wordBreak: "break-all ",
                    }}
                  >
                    <span style={{ fontWeight: "bold" }}>{comment.name}</span>
                    <span>{comment.txt}</span>
                  </div>
                </CommentContainer>
              );
            })
          ) : (
            <>
              <h4 style={{ textAlign: "center" }}>No Commets</h4>
            </>
          )}
          <CommentInputContainer>
            <CommentInput
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="Add a Comment"
            />
            <CommentPost
              onClick={() => {
                if (comment.trim() !== "") {
                  db.collection("Posts")
                    .doc(id)
                    .update({
                      commets: firebase.firestore.FieldValue.arrayUnion({
                        DP: userPhoto,
                        name: Username,
                        txt: comment,
                      }),
                    });
                  setComment("");
                }
              }}
              isEmpty={!comment}
            >
              POST
            </CommentPost>
          </CommentInputContainer>
          <CommentBackButton onClick={() => setShowComment(false)}>
            Back
          </CommentBackButton>
        </>
      )}
    </PostWrapper>
  );
}

export default Post;
