'use client'
import { useState } from 'react'
import { FaShieldAlt, FaThumbsUp } from 'react-icons/fa'

export default function CommentPanel() {
  const [newComment, setNewComment] = useState('')
  const [comments, setComments] = useState([
    {
      id: 1,
      author: 'TraderofCheats',
      content: 'POA has to be a bot lol',
      datetime: '48m ago',
      likes: 1,
      position: { type: 'Yes', amount: '96.8K' },
      replies: [],
      showReply: false,
      replyText: '',
    },
  ])
  const [commentSort, setCommentSort] = useState('newest')
  const [showHoldersOnly, setShowHoldersOnly] = useState(false)
  const [nextId, setNextId] = useState(100)

  const addComment = () => {
    if (!newComment.trim()) return
    setComments([
      ...comments,
      {
        id: nextId,
        author: '匿名用户',
        content: newComment.trim(),
        datetime: new Date().toLocaleString(),
        likes: 0,
        replies: [],
        showReply: false,
        replyText: '',
      },
    ])
    setNextId(nextId + 1)
    setNewComment('')
  }

  const likeComment = (id) => {
    setComments(
      comments.map((c) =>
        c.id === id ? { ...c, likes: c.likes + 1 } : c
      )
    )
  }

  const deleteComment = (id) => {
    setComments(comments.filter((c) => c.id !== id))
  }

  const toggleReply = (id) => {
    setComments(
      comments.map((c) =>
        c.id === id ? { ...c, showReply: !c.showReply } : c
      )
    )
  }

  const submitReply = (commentId) => {
    setComments(
      comments.map((c) => {
        if (c.id === commentId && c.replyText.trim()) {
          return {
            ...c,
            replies: [
              ...c.replies,
              {
                id: Date.now(),
                author: '匿名回复',
                content: c.replyText,
                datetime: new Date().toLocaleString(),
                likes: 0,
              },
            ],
            replyText: '',
            showReply: false,
          }
        }
        return c
      })
    )
  }

  const likeReply = (commentId, replyId) => {
    setComments(
      comments.map((c) =>
        c.id === commentId
          ? {
              ...c,
              replies: c.replies.map((r) =>
                r.id === replyId ? { ...r, likes: r.likes + 1 } : r
              ),
            }
          : c
      )
    )
  }

  const deleteReply = (commentId, replyId) => {
    setComments(
      comments.map((c) =>
        c.id === commentId
          ? {
              ...c,
              replies: c.replies.filter((r) => r.id !== replyId),
            }
          : c
      )
    )
  }

  const filteredComments = () => {
    let result = [...comments]
    if (showHoldersOnly) {
      result = result.filter((c) => c.position)
    }
    return commentSort === 'newest' ? result : result.reverse()
  }

  return (
    <div className="p-4 space-y-4">
      {/* 评论输入框 */}
      <div className="flex h-10">
        <input
          className="flex-1 px-3 rounded-l border border-gray-300 text-sm"
          placeholder="Add a comment"
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
        />
        <button
          className="w-24 bg-blue-500 text-white rounded-r text-sm disabled:opacity-50"
          disabled={!newComment.trim()}
          onClick={addComment}
        >
          Post
        </button>
      </div>

      {/* 安全提示 */}
      <div className="flex items-center bg-gray-100 rounded px-4 py-3">
        <FaShieldAlt className="text-blue-500 mr-2" />
        <span className="text-sm text-gray-600">
          Beware of external links, they may be phishing attacks.
        </span>
      </div>

      {/* 筛选区域 */}
      <div className="flex items-center gap-4">
        {/* 排序按钮 */}
        {commentSort === 'newest' ? (
          <button
            className="px-4 py-2 rounded-full bg-gray-200 text-sm"
            onClick={() => setCommentSort('oldest')}
          >
            newest 🔽
          </button>
        ) : (
          <button
            className="px-4 py-2 rounded-full bg-gray-200 text-sm"
            onClick={() => setCommentSort('newest')}
          >
            oldest 🔼
          </button>
        )}

        {/* 只看持有者 */}
        <label className="flex items-center gap-1 text-sm">
          <input
            type="checkbox"
            checked={showHoldersOnly}
            onChange={() => setShowHoldersOnly((prev) => !prev)}
          />
          Holders
        </label>
      </div>

      {/* 评论列表 */}
      {filteredComments().map((comment) => (
        <div key={comment.id} className="border-t pt-4">
          <div className="text-sm text-gray-700 font-semibold">
            {comment.author}{' '}
            <span className="text-gray-400 text-xs ml-2">
              {comment.datetime}
            </span>
          </div>
          <div className="text-gray-800 text-sm mt-1">{comment.content}</div>
          <div className="flex gap-4 mt-2 text-blue-600 text-sm">
            <button onClick={() => likeComment(comment.id)}>
              👍 {comment.likes}
            </button>
            <button onClick={() => toggleReply(comment.id)}>回复</button>
            <button onClick={() => deleteComment(comment.id)}>删除</button>
          </div>

          {/* 回复框 */}
          {comment.showReply && (
            <div className="mt-2">
              <textarea
                className="w-full border rounded p-2 text-sm"
                placeholder="回复..."
                value={comment.replyText}
                onChange={(e) =>
                  setComments(
                    comments.map((c) =>
                      c.id === comment.id
                        ? { ...c, replyText: e.target.value }
                        : c
                    )
                  )
                }
              />
              <button
                className="mt-1 bg-blue-500 text-white px-3 py-1 text-sm rounded"
                onClick={() => submitReply(comment.id)}
              >
                提交
              </button>
            </div>
          )}

          {/* 子回复列表 */}
          {comment.replies.length > 0 && (
            <div className="mt-3 ml-4 border-l-2 border-gray-200 pl-4 space-y-2">
              {comment.replies.map((reply) => (
                <div key={reply.id}>
                  <div className="text-sm font-medium text-gray-700">
                    {reply.author}{' '}
                    <span className="text-xs text-gray-400 ml-2">
                      {reply.datetime}
                    </span>
                  </div>
                  <div className="text-sm text-gray-800 mt-1">
                    {reply.content}
                  </div>
                  <div className="flex gap-4 text-sm text-blue-600 mt-1">
                    <button onClick={() => likeReply(comment.id, reply.id)}>
                      👍 {reply.likes}
                    </button>
                    <button onClick={() => deleteReply(comment.id, reply.id)}>
                      删除
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  )
}
