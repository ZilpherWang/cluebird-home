'use client'
import { useState } from 'react'
import { FaUser, FaRegCommentDots, FaStar, FaTrash } from 'react-icons/fa'

export default function CommentItem({
  comment,
  onAddReply,
  onDeleteComment,
  onLikeComment,
  onDeleteReply,
  onLikeReply,
}) {
  const [showReply, setShowReply] = useState(false)
  const [replyContent, setReplyContent] = useState('')

  const handleSubmitReply = () => {
    if (!replyContent.trim()) return
    onAddReply(comment.id, replyContent.trim())
    setReplyContent('')
    setShowReply(false)
  }

  return (
    <div className="bg-blue-50 p-4 rounded shadow-sm mb-6">
      {/* 主评论内容 */}
      <div className="flex items-start gap-4">
        <div className="flex-shrink-0 w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center">
          <FaUser className="text-gray-500" />
        </div>
        <div className="flex-1">
          <div className="flex justify-between items-center">
            <div className="font-medium text-gray-800">{comment.author}</div>
            <div className="text-xs text-gray-500">{comment.datetime}</div>
          </div>
          <p className="text-gray-700 mt-1">{comment.content}</p>

          {/* 操作按钮 */}
          <div className="flex gap-4 mt-2 text-sm text-blue-600">
            <button
              onClick={() => setShowReply((prev) => !prev)}
              className="flex items-center gap-1 hover:underline"
            >
              <FaRegCommentDots /> 回复
            </button>
            <button
              onClick={() => onLikeComment(comment.id)}
              className="flex items-center gap-1 hover:underline"
            >
              <FaStar /> {comment.likes}
            </button>
            <button
              onClick={() => onDeleteComment(comment.id)}
              className="flex items-center gap-1 text-red-500 hover:underline"
            >
              <FaTrash /> 删除
            </button>
          </div>

          {/* 回复输入框 */}
          {showReply && (
            <div className="mt-3">
              <textarea
                className="w-full border border-gray-300 rounded p-2 text-sm"
                rows={2}
                placeholder="请输入回复内容"
                value={replyContent}
                onChange={(e) => setReplyContent(e.target.value)}
              />
              <button
                onClick={handleSubmitReply}
                disabled={!replyContent.trim()}
                className="mt-2 px-4 py-1 text-white bg-blue-600 hover:bg-blue-700 text-sm rounded disabled:opacity-50"
              >
                提交
              </button>
            </div>
          )}
        </div>
      </div>

      {/* 子回复列表 */}
      {comment.replies?.length > 0 && (
        <div className="mt-4 ml-12 space-y-4">
          {comment.replies.map((reply) => (
            <div
              key={reply.id}
              className="flex items-start gap-3 bg-gray-50 p-3 rounded"
            >
              <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center">
                <FaUser className="text-gray-500 text-sm" />
              </div>
              <div className="flex-1">
                <div className="flex justify-between items-center">
                  <div className="font-medium text-gray-800 text-sm">
                    {reply.author}
                  </div>
                  <div className="text-xs text-gray-500">
                    {reply.datetime}
                  </div>
                </div>
                <p className="text-gray-700 text-sm mt-1">{reply.content}</p>
                <div className="flex gap-4 mt-1 text-xs text-blue-600">
                  <button
                    onClick={() => onLikeReply(comment.id, reply.id)}
                    className="flex items-center gap-1 hover:underline"
                  >
                    <FaStar /> {reply.likes}
                  </button>
                  <button
                    onClick={() => onDeleteReply(comment.id, reply.id)}
                    className="flex items-center gap-1 text-red-500 hover:underline"
                  >
                    <FaTrash /> 删除
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
