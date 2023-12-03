"use client";

import Link from "next/link";
import { formatTime } from "@/utils/format";
import { ArticleItem } from "@/types/server";
import FavoritesButton from "@/components/common/FavoritesButton";
import { useState } from "react";

interface ArticlePreviewProps {
  article: ArticleItem;
}

const ArticlePreview = ({ article: articleInit }: ArticlePreviewProps) => {
  const [article, setArticle] = useState(articleInit);

  const handleFavorite = (newArticle: ArticleItem) => {
    setArticle({ ...newArticle });
  };
  return (
    <>
      <div className="article-preview">
        <div className="article-meta">
          <Link href={`/profile/${article.author.username}`}>
            <img alt="" src={article.author?.image || ""} />
          </Link>
          <div className="info">
            <Link href={`/profile/${article.author.username}`} className="author">
              {article.author.username}
            </Link>
            <span className="date">{formatTime(article.updatedAt)}</span>
          </div>
          <FavoritesButton
            article={article}
            onChange={handleFavorite}
            className="btn btn-sm pull-xs-right"
          />
        </div>
        <Link href={`/article/${article.slug}`} className="preview-link">
          <h1>{article.title}</h1>
          <p>{article.description}</p>
          <span>Read more...</span>
          <ul className="tag-list">
            {article.tagList.map((tag: string) => {
              return (
                <li className="tag-default tag-pill tag-outline" key={tag}>
                  {tag}
                </li>
              );
            })}
          </ul>
        </Link>
      </div>
    </>
  );
};

export default ArticlePreview;
