import "./App.css";
import React, { useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useCollectionData } from "react-firebase-hooks/firestore";
import Nav from "./components/Nav";
import { db, auth, firebase } from "./firebase";
import Post from "./components/Post";

function App() {
  const [loading, setLoading] = useState("");
  const [user] = useAuthState(auth);
  const [posts] = useCollectionData(
    db.collection("Posts").orderBy("createdAt", "desc"),
    { idField: "id" }
  );

  return (
    <div className={!user ? "App flexCenter" : "App postMode"}>
      {loading && <div className="POG flexCenter">{loading}</div>}

      {user ? (
        <>
          <Nav
            logOut={() => auth.signOut()}
            userData={{
              username: user.displayName,
              photoURL: user.photoURL,
              email: user.email,
            }}
            SignIn={() => {
              auth.signInWithPopup(new firebase.auth.GoogleAuthProvider());
            }}
            setProgress={setLoading}
          />
          {posts &&
            posts.map((post) => {
              return (
                <Post
                  userData={{
                    Username: user.displayName,
                    userPhoto: user.photoURL,
                  }}
                  Data={post}
                />
              );
            })}
        </>
      ) : (
        <Nav
          not
          SignIn={() => {
            auth.signInWithPopup(new firebase.auth.GoogleAuthProvider());
          }}
          userData={{
            username: "",
            photoURL: "",
            email: "",
          }}
        />
      )}
    </div>
  );
}

export default App;
