"use client";

import { useState } from "react";

interface ReplyCardProps {
  reply: string;
  onCopy: () => void;
  onRegenerate: () => void;
  onSave: () => void;
}

export default function ReplyCard({
  reply,
  onCopy,
  onRegenerate,
  onSave,
}: ReplyCardProps) {
  const [editing, setEditing] = useState(false);
  const [editedReply, setEditedReply] = useState(reply);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(editing ? editedReply : reply);
    onCopy();
  };

  return (
    <div className="rounded-xl border border-gray-200 bg-white overflow-hidden">
      <div className="px-5 py-4 border-b border-gray-100 flex items-center justify-between">
        <h3 className="text-sm font-semibold text-gray-900">Generated Reply</h3>
        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-500">
          {reply.length} chars
        </span>
      </div>

      <div className="px-5 py-4">
        {editing ? (
          <textarea
            value={editedReply}
            onChange={(e) => setEditedReply(e.target.value)}
            className="w-full rounded-lg border border-gray-200 bg-white px-4 py-3 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-accent/20 focus:border-accent transition-colors resize-none min-h-[120px]"
            rows={5}
          />
        ) : (
          <p className="text-sm text-gray-700 leading-relaxed whitespace-pre-wrap">
            {reply}
          </p>
        )}
      </div>

      <div className="px-5 py-4 bg-gray-50 border-t border-gray-100 flex flex-wrap items-center gap-2">
        <button
          onClick={handleCopy}
          className="inline-flex items-center justify-center rounded-lg bg-accent px-4 py-2 text-sm font-medium text-white hover:bg-accent-hover transition-colors duration-150"
          aria-label="Copy reply"
        >
          Copy reply
        </button>
        <button
          onClick={onRegenerate}
          className="inline-flex items-center justify-center rounded-lg bg-white border border-gray-200 px-4 py-2 text-sm font-medium text-gray-900 hover:bg-gray-50 transition-colors duration-150"
          aria-label="Regenerate reply"
        >
          Regenerate
        </button>
        <button
          onClick={onSave}
          className="inline-flex items-center justify-center rounded-lg bg-white border border-gray-200 px-4 py-2 text-sm font-medium text-gray-900 hover:bg-gray-50 transition-colors duration-150"
          aria-label="Save reply"
        >
          Save
        </button>
        <button
          onClick={() => {
            setEditing(!editing);
            if (editing) setEditedReply(reply);
          }}
          className="inline-flex items-center justify-center rounded-lg bg-white border border-gray-200 px-4 py-2 text-sm font-medium text-gray-900 hover:bg-gray-50 transition-colors duration-150 ml-auto"
          aria-label={editing ? "Cancel edit" : "Edit reply"}
        >
          {editing ? "Cancel" : "Edit before posting"}
        </button>
      </div>
    </div>
  );
}
