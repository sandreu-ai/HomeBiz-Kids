"use client";

import { useState } from "react";
import { Plus, Trash2, GripVertical } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface ChecklistItem {
  id: string;
  text: string;
  required: boolean;
}

export function ChecklistEditor({
  initial = [],
  onChange,
}: {
  initial?: ChecklistItem[];
  onChange?: (items: ChecklistItem[]) => void;
}) {
  const [items, setItems] = useState<ChecklistItem[]>(initial);
  const [newItem, setNewItem] = useState("");

  function addItem() {
    if (!newItem.trim()) return;
    const next: ChecklistItem[] = [
      ...items,
      { id: `ck-${Date.now()}`, text: newItem.trim(), required: true },
    ];
    setItems(next);
    onChange?.(next);
    setNewItem("");
  }

  function removeItem(id: string) {
    const next = items.filter((it) => it.id !== id);
    setItems(next);
    onChange?.(next);
  }

  function toggleRequired(id: string) {
    const next = items.map((it) => (it.id === id ? { ...it, required: !it.required } : it));
    setItems(next);
    onChange?.(next);
  }

  return (
    <div className="space-y-3">
      {items.length === 0 ? (
        <p className="text-xs text-ink-3 italic px-3 py-2 bg-bone rounded-lg">
          No checklist items yet. Add at least 3 to define what "done" means.
        </p>
      ) : (
        <ul className="space-y-1.5">
          {items.map((item) => (
            <li
              key={item.id}
              className="flex items-center gap-2 bg-bone rounded-xl px-3 py-2"
            >
              <GripVertical className="w-3.5 h-3.5 text-line" />
              <span className="text-sm text-ink flex-1">{item.text}</span>
              <button
                type="button"
                onClick={() => toggleRequired(item.id)}
                className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${
                  item.required
                    ? "bg-blue-deep text-white"
                    : "bg-line text-ink-3"
                }`}
              >
                {item.required ? "Required" : "Optional"}
              </button>
              <button
                type="button"
                onClick={() => removeItem(item.id)}
                className="text-ink-3 hover:text-red-deep"
              >
                <Trash2 className="w-3.5 h-3.5" />
              </button>
            </li>
          ))}
        </ul>
      )}

      <div className="flex gap-2">
        <Input
          value={newItem}
          onChange={(e) => setNewItem(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.preventDefault();
              addItem();
            }
          }}
          placeholder="Add a checklist item (e.g. Vacuum the floor)"
        />
        <Button type="button" variant="outline" onClick={addItem}>
          <Plus className="w-4 h-4" />
          Add
        </Button>
      </div>
    </div>
  );
}
