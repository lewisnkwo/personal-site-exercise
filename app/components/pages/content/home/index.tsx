import PostItem from "./post-item";
import { useEffect, useState, useRef } from "react";
import SidebarDetail from "../../../shared/sidebar-detail";
import type { Post } from "~/types";

interface Props {
  posts: Post[];
}

const Home = ({ posts }: Props) => {
  const [isMobile, setIsMobile] = useState<boolean>(false);
  const [selectedPost, setSelectedPost] = useState<Post | undefined>(undefined);

  const sidebarPostRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    setIsMobile(window.innerWidth <= 768);
  }, []);

  useEffect(() => {
    if (sidebarPostRef?.current) {
      sidebarPostRef.current.scrollIntoView({
        behavior: "smooth",
        block: "end",
        inline: "nearest",
      });
    }
  }, [selectedPost]);

  return (
    <div className={`Home${selectedPost ? "-with-sidebar" : ""}`}>
      <main>
        <div>
          <section>
            <span className="Home__heading">Latest posts</span>
            <span className="Home__description">What's new on my mind...</span>
            <div className="Home__select-posts">
              Choice of posts:
              <select name="users" defaultValue="developers">
                <option value="coding">Coding</option>
                <option value="coding">Travel</option>
              </select>
            </div>
          </section>
          <section className="Home__post-list">
            {posts.map((p, i) => (
              <PostItem
                key={i}
                {...p}
                onSelect={() =>
                  setSelectedPost(selectedPost?.id === p.id ? undefined : p)
                }
                isSelected={selectedPost?.id === p.id}
                tabIndex={i}
              />
            ))}
          </section>
        </div>
      </main>
      {selectedPost && (
        <div ref={isMobile ? sidebarPostRef : null}>
          <SidebarDetail {...selectedPost} />
        </div>
      )}
    </div>
  );
};

export default Home;
