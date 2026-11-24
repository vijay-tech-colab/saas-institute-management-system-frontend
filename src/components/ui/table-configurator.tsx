"use client";

import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import {
  ArrowDown,
  ArrowUp,
  Columns3,
  GripVertical,
  Hash,
  RotateCcw,
  Search,
  X,
} from "lucide-react";
import { cn } from "@/lib/utils";
import {
  FloatingSheet,
  FloatingSheetBody,
  FloatingSheetFooter,
  FloatingSheetHeader,
} from "@/components/ui/floating-sheet";

export interface TableColumnDef<T> {
  id: string;
  label: string;
  icon?: React.ComponentType<{ className?: string }>;
  defaultVisible?: boolean;
  locked?: boolean;
  thClassName?: string;
  tdClassName?: string;
  renderHeader?: () => React.ReactNode;
  renderCell: (row: T, index: number) => React.ReactNode;
}

export function ColumnHeaderLabel({
  label,
  icon: Icon,
}: {
  label: string;
  icon?: React.ComponentType<{ className?: string }>;
}) {
  return (
    <span className="inline-flex items-center gap-1.5">
      {Icon && <Icon className="w-3.5 h-3.5 text-slate-400 shrink-0" />}
      <span>{label}</span>
    </span>
  );
}

interface StoredColumnState {
  order: string[];
  hidden: string[];
}

export function useTableColumns<T>(
  storageKey: string,
  columns: TableColumnDef<T>[]
) {
  const defaultOrder = useMemo(() => columns.map((c) => c.id), [columns]);
  const defaultHidden = useMemo(
    () =>
      columns
        .filter((c) => c.defaultVisible === false && !c.locked)
        .map((c) => c.id),
    [columns]
  );

  const [order, setOrder] = useState<string[]>(defaultOrder);
  const [hiddenSet, setHiddenSet] = useState<Set<string>>(
    () => new Set(defaultHidden)
  );
  const [hydrated, setHydrated] = useState(false);

  // Hydrate saved column preferences once on mount (async to avoid sync setState in effect)
  useEffect(() => {
    let active = true;
    const timer = window.setTimeout(() => {
      if (!active) return;
      try {
        const raw = window.localStorage.getItem(`campusos.table.${storageKey}`);
        if (raw) {
          const parsed = JSON.parse(raw) as Partial<StoredColumnState>;
          if (Array.isArray(parsed.order) && parsed.order.length > 0) {
            const validIds = new Set(columns.map((c) => c.id));
            const mergedOrder = parsed.order.filter((id) => validIds.has(id));
            columns.forEach((c) => {
              if (!mergedOrder.includes(c.id)) mergedOrder.push(c.id);
            });
            setOrder(mergedOrder);
          }
          if (Array.isArray(parsed.hidden)) {
            const lockIds = new Set(columns.filter((c) => c.locked).map((c) => c.id));
            setHiddenSet(
              new Set(parsed.hidden.filter((id) => !lockIds.has(id)))
            );
          }
        }
      } catch {
        // Ignore storage errors
      } finally {
        if (active) setHydrated(true);
      }
    }, 0);

    return () => {
      active = false;
      window.clearTimeout(timer);
    };
  }, [storageKey, columns]);

  useEffect(() => {
    if (!hydrated) return;
    try {
      const payload: StoredColumnState = {
        order,
        hidden: Array.from(hiddenSet),
      };
      window.localStorage.setItem(
        `campusos.table.${storageKey}`,
        JSON.stringify(payload)
      );
    } catch {
      // Ignore storage errors
    }
  }, [hydrated, storageKey, order, hiddenSet]);

  const orderedColumns = useMemo(() => {
    const map = new Map(columns.map((c) => [c.id, c]));
    const result: TableColumnDef<T>[] = [];
    order.forEach((id) => {
      const col = map.get(id);
      if (col) result.push(col);
    });
    columns.forEach((col) => {
      if (!order.includes(col.id)) result.push(col);
    });
    return result;
  }, [columns, order]);

  const visibleColumns = useMemo(
    () => orderedColumns.filter((c) => c.locked || !hiddenSet.has(c.id)),
    [orderedColumns, hiddenSet]
  );

  const toggleColumn = useCallback(
    (id: string) => {
      const target = columns.find((c) => c.id === id);
      if (target?.locked) return;
      setHiddenSet((prev) => {
        const next = new Set(prev);
        if (next.has(id)) {
          next.delete(id);
        } else {
          // Always keep at least 1 data column visible
          const remaining = orderedColumns.filter(
            (c) => c.id !== id && (c.locked || !next.has(c.id))
          );
          if (remaining.length > 0) {
            next.add(id);
          }
        }
        return next;
      });
    },
    [columns, orderedColumns]
  );

  const hideAllOptional = useCallback(() => {
    const toggleable = orderedColumns.filter((c) => !c.locked);
    if (toggleable.length <= 1) return;
    // Keep the first toggleable column visible so the table is never completely blank
    const [, ...rest] = toggleable;
    setHiddenSet(new Set(rest.map((c) => c.id)));
  }, [orderedColumns]);

  const showAll = useCallback(() => {
    setHiddenSet(new Set());
  }, []);

  const resetColumns = useCallback(() => {
    setOrder(defaultOrder);
    setHiddenSet(new Set(defaultHidden));
  }, [defaultOrder, defaultHidden]);

  const moveColumn = useCallback((fromId: string, toId: string) => {
    if (fromId === toId) return;
    setOrder((prev) => {
      const next = [...prev];
      const fromIdx = next.indexOf(fromId);
      const toIdx = next.indexOf(toId);
      if (fromIdx === -1 || toIdx === -1) return prev;
      const [item] = next.splice(fromIdx, 1);
      next.splice(toIdx, 0, item);
      return next;
    });
  }, []);

  const isCustomized = useMemo(() => {
    if (hiddenSet.size !== defaultHidden.length) return true;
    for (const id of defaultHidden) {
      if (!hiddenSet.has(id)) return true;
    }
    return order.some((id, idx) => defaultOrder[idx] !== id);
  }, [hiddenSet, defaultHidden, order, defaultOrder]);

  return {
    orderedColumns,
    visibleColumns,
    hiddenSet,
    toggleColumn,
    hideAllOptional,
    showAll,
    resetColumns,
    moveColumn,
    isCustomized,
  };
}

interface TableFieldsButtonProps<T> {
  columns: TableColumnDef<T>[];
  hiddenSet: Set<string>;
  onToggle: (id: string) => void;
  onMove: (fromId: string, toId: string) => void;
  onHideAll: () => void;
  onShowAll: () => void;
  onReset: () => void;
  isCustomized?: boolean;
  idFieldLabel?: string;
  className?: string;
}

export function TableFieldsButton<T>({
  columns,
  hiddenSet,
  onToggle,
  onMove,
  onHideAll,
  onShowAll,
  onReset,
  isCustomized,
  idFieldLabel = "ID",
  className,
}: TableFieldsButtonProps<T>) {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [dragId, setDragId] = useState<string | null>(null);
  const [dragOverId, setDragOverId] = useState<string | null>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!open) return;

    const focusTimer = window.setTimeout(() => {
      searchInputRef.current?.focus();
    }, 120);

    return () => {
      window.clearTimeout(focusTimer);
    };
  }, [open]);

  const normalizedQuery = query.trim().toLowerCase();

  const shownCols = useMemo(
    () =>
      columns.filter(
        (c) =>
          (c.locked || !hiddenSet.has(c.id)) &&
          (!normalizedQuery || c.label.toLowerCase().includes(normalizedQuery))
      ),
    [columns, hiddenSet, normalizedQuery]
  );

  const hiddenCols = useMemo(
    () =>
      columns.filter(
        (c) =>
          !c.locked &&
          hiddenSet.has(c.id) &&
          (!normalizedQuery || c.label.toLowerCase().includes(normalizedQuery))
      ),
    [columns, hiddenSet, normalizedQuery]
  );

  const visibleCount = columns.filter((c) => c.locked || !hiddenSet.has(c.id)).length;
  const toggleableCount = columns.filter((c) => !c.locked).length;
  const allOptionalHidden =
    toggleableCount > 1 && hiddenCols.length >= toggleableCount - 1;

  const moveStep = useCallback(
    (colId: string, direction: -1 | 1) => {
      const idx = shownCols.findIndex((c) => c.id === colId);
      const targetIdx = idx + direction;
      if (idx === -1 || targetIdx < 0 || targetIdx >= shownCols.length) return;
      onMove(colId, shownCols[targetIdx].id);
    },
    [shownCols, onMove]
  );

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        title="Customize visible columns and order"
        className={cn(
          "inline-flex items-center gap-2 h-9.5 px-3.5 rounded-xl border text-xs font-medium transition-all shadow-2xs cursor-pointer whitespace-nowrap",
          open || isCustomized
            ? "bg-primary-light border-primary/40 text-primary hover:border-primary"
            : "bg-white border-slate-200 text-slate-700 hover:bg-slate-50 hover:border-slate-300",
          className
        )}
      >
        <Columns3 className="w-3.5 h-3.5 shrink-0" />
        <span>Fields</span>
        <span
          className={cn(
            "px-1.5 py-0.5 rounded-md text-[10px] font-semibold tabular-nums leading-none",
            open || isCustomized
              ? "bg-primary text-white"
              : "bg-slate-100 text-slate-600"
          )}
        >
          {visibleCount}/{columns.length}
        </span>
      </button>

      <FloatingSheet
        open={open}
        onClose={() => setOpen(false)}
        ariaLabel="Configure table fields"
        widthClassName="w-[min(364px,calc(100vw-1.5rem))]"
      >
        <FloatingSheetHeader
          title="Fields"
          onClose={() => setOpen(false)}
          closeAriaLabel="Close fields panel"
          badge={
            <span className="px-2 py-0.5 rounded-full bg-slate-100 text-[11px] font-semibold text-slate-600 tabular-nums">
              {visibleCount}/{columns.length}
            </span>
          }
        />

                  {/* Search Box */}
                  <div className="px-4 pt-3.5 pb-2 shrink-0">
                    <div className="relative flex items-center">
                      <Search className="w-4 h-4 text-slate-400 absolute left-3 pointer-events-none" />
                      <input
                        ref={searchInputRef}
                        type="text"
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        placeholder="Search fields..."
                        className="w-full h-10 pl-9 pr-9 text-[13px] bg-white border-[1.5px] border-primary/60 rounded-xl focus:outline-none focus:ring-3 focus:ring-primary/15 focus:border-primary placeholder:text-slate-400 text-slate-800 transition-all"
                      />
                      {query && (
                        <button
                          type="button"
                          onClick={() => setQuery("")}
                          aria-label="Clear search"
                          className="absolute right-2.5 p-1 rounded-full text-slate-400 hover:text-slate-700 hover:bg-slate-100 cursor-pointer"
                        >
                          <X className="w-3.5 h-3.5" />
                        </button>
                      )}
                    </div>
                  </div>

                  {/* Scrollable Field Lists */}
                  <FloatingSheetBody className="px-4 pb-4 space-y-4">
                    {/* Shown Group */}
                    <div>
                      <div className="flex items-center justify-between py-2 px-1">
                        <span className="text-xs font-medium text-slate-500">
                          Shown ({shownCols.length + 1})
                        </span>
                        <button
                          type="button"
                          onClick={allOptionalHidden ? onShowAll : onHideAll}
                          className="text-xs font-medium text-slate-500 hover:text-primary transition-colors cursor-pointer"
                        >
                          {allOptionalHidden ? "Show all" : "Hide all"}
                        </button>
                      </div>

                      <div className="space-y-0.5">
                        {/* Pinned ID Field (Always Shown & Locked) */}
                        {(!normalizedQuery ||
                          idFieldLabel.toLowerCase().includes(normalizedQuery)) && (
                          <div className="flex items-center justify-between px-2 py-2.5 rounded-xl text-slate-400 select-none">
                            <div className="flex items-center gap-2.5 min-w-0">
                              <GripVertical className="w-3.5 h-3.5 text-slate-300 shrink-0" />
                              <Hash className="w-4 h-4 text-slate-400 shrink-0" />
                              <span className="text-[13px] font-medium truncate">
                                {idFieldLabel}
                              </span>
                            </div>
                            <span
                              title="Pinned column"
                              className="w-9 h-5 rounded-full bg-slate-200/80 p-0.5 flex items-center justify-end opacity-60 cursor-not-allowed shrink-0"
                            >
                              <span className="w-4 h-4 rounded-full bg-white shadow-2xs" />
                            </span>
                          </div>
                        )}

                        {/* Reorderable Shown Columns */}
                        {shownCols.map((col, idx) => {
                          const Icon = col.icon;
                          const isDragging = dragId === col.id;
                          const isOver = dragOverId === col.id && dragId !== col.id;

                          return (
                            <div
                              key={col.id}
                              draggable
                              onDragStart={(e) => {
                                setDragId(col.id);
                                e.dataTransfer.effectAllowed = "move";
                              }}
                              onDragOver={(e) => {
                                e.preventDefault();
                                if (dragOverId !== col.id) setDragOverId(col.id);
                              }}
                              onDrop={(e) => {
                                e.preventDefault();
                                if (dragId) onMove(dragId, col.id);
                                setDragId(null);
                                setDragOverId(null);
                              }}
                              onDragEnd={() => {
                                setDragId(null);
                                setDragOverId(null);
                              }}
                              className={cn(
                                "flex items-center justify-between px-2 py-2.5 rounded-xl transition-colors group",
                                isDragging
                                  ? "opacity-40 bg-slate-50"
                                  : "hover:bg-slate-50",
                                isOver && "border-t-2 border-primary"
                              )}
                            >
                              <div className="flex items-center gap-2.5 min-w-0 pr-2">
                                <GripVertical className="w-3.5 h-3.5 text-slate-300 group-hover:text-slate-500 cursor-grab active:cursor-grabbing shrink-0" />
                                {Icon && (
                                  <Icon className="w-4 h-4 text-slate-400 shrink-0" />
                                )}
                                <span className="text-[13px] font-medium text-slate-800 truncate">
                                  {col.label}
                                </span>
                              </div>

                              <div className="flex items-center gap-1 shrink-0">
                                {/* Quick 1-click reorder buttons on hover */}
                                {!normalizedQuery && (
                                  <div className="hidden sm:flex items-center gap-0.5 opacity-0 group-hover:opacity-100 transition-opacity mr-1">
                                    <button
                                      type="button"
                                      onClick={() => moveStep(col.id, -1)}
                                      disabled={idx === 0}
                                      title="Move up"
                                      aria-label={`Move ${col.label} up`}
                                      className="p-1 rounded-md text-slate-400 hover:text-slate-700 hover:bg-slate-200/60 disabled:opacity-25 disabled:pointer-events-none cursor-pointer"
                                    >
                                      <ArrowUp className="w-3 h-3" />
                                    </button>
                                    <button
                                      type="button"
                                      onClick={() => moveStep(col.id, 1)}
                                      disabled={idx === shownCols.length - 1}
                                      title="Move down"
                                      aria-label={`Move ${col.label} down`}
                                      className="p-1 rounded-md text-slate-400 hover:text-slate-700 hover:bg-slate-200/60 disabled:opacity-25 disabled:pointer-events-none cursor-pointer"
                                    >
                                      <ArrowDown className="w-3 h-3" />
                                    </button>
                                  </div>
                                )}

                                <button
                                  type="button"
                                  role="switch"
                                  aria-checked={true}
                                  aria-label={`Hide ${col.label}`}
                                  disabled={col.locked}
                                  onClick={() => onToggle(col.id)}
                                  className={cn(
                                    "w-9 h-5 rounded-full p-0.5 flex items-center justify-end transition-colors shrink-0",
                                    col.locked
                                      ? "bg-slate-200 cursor-not-allowed opacity-70"
                                      : "bg-primary hover:bg-primary-hover cursor-pointer"
                                  )}
                                >
                                  <span className="w-4 h-4 rounded-full bg-white shadow-2xs" />
                                </button>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>

                    {/* Hidden Group */}
                    {hiddenCols.length > 0 && (
                      <div className="pt-3 border-t border-slate-100">
                        <div className="flex items-center justify-between py-2 px-1">
                          <span className="text-xs font-medium text-slate-500">
                            Hidden ({hiddenCols.length})
                          </span>
                          <button
                            type="button"
                            onClick={onShowAll}
                            className="text-xs font-medium text-primary hover:text-primary-hover transition-colors cursor-pointer"
                          >
                            Show all
                          </button>
                        </div>

                        <div className="space-y-0.5">
                          {hiddenCols.map((col) => {
                            const Icon = col.icon;
                            return (
                              <div
                                key={col.id}
                                className="flex items-center justify-between px-2 py-2.5 rounded-xl hover:bg-slate-50 transition-colors group"
                              >
                                <div className="flex items-center gap-2.5 min-w-0 pr-2">
                                  <GripVertical className="w-3.5 h-3.5 text-slate-200 shrink-0" />
                                  {Icon && (
                                    <Icon className="w-4 h-4 text-slate-400 shrink-0" />
                                  )}
                                  <span className="text-[13px] font-medium text-slate-500 group-hover:text-slate-800 truncate">
                                    {col.label}
                                  </span>
                                </div>

                                <button
                                  type="button"
                                  role="switch"
                                  aria-checked={false}
                                  aria-label={`Show ${col.label}`}
                                  onClick={() => onToggle(col.id)}
                                  className="w-9 h-5 rounded-full bg-slate-200 hover:bg-slate-300 p-0.5 flex items-center justify-start transition-colors shrink-0 cursor-pointer"
                                >
                                  <span className="w-4 h-4 rounded-full bg-white shadow-2xs" />
                                </button>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    )}

                    {shownCols.length === 0 && hiddenCols.length === 0 && (
                      <p className="py-10 text-center text-xs text-slate-400">
                        No fields matching &ldquo;{query}&rdquo;
                      </p>
                    )}
                  </FloatingSheetBody>

                  <FloatingSheetFooter>
                    <button
                      type="button"
                      onClick={onReset}
                      disabled={!isCustomized}
                      className={cn(
                        "inline-flex items-center gap-1.5 text-xs font-medium px-2.5 py-1.5 rounded-lg transition-colors",
                        isCustomized
                          ? "text-slate-700 hover:bg-slate-200/70 cursor-pointer"
                          : "text-slate-400 cursor-not-allowed"
                      )}
                    >
                      <RotateCcw className="w-3.5 h-3.5" />
                      <span>Reset default</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => setOpen(false)}
                      className="px-4 py-1.5 rounded-xl bg-primary hover:bg-primary-hover text-white text-xs font-semibold shadow-xs transition-colors cursor-pointer"
                    >
                      Done
                    </button>
                  </FloatingSheetFooter>
      </FloatingSheet>
    </>
  );
}
