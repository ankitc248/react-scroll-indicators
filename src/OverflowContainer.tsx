/**
 * OverflowContainer – React component for smooth scrolling with hover-activated
 * indicators when content overflows. Supports horizontal and vertical scrolling.
 * @license MIT
 */

import "./overflow-container.css";
import {
  type ForwardedRef,
  forwardRef,
  useEffect,
  useRef,
  useState,
} from "react";

function cn(...classes: (string | undefined | null | false)[]): string {
  return classes.filter(Boolean).join(" ");
}

export interface OverflowContainerProps
  extends React.HTMLAttributes<HTMLDivElement> {
  /** Custom className for the outer container */
  className?: string;

  /** Content to be rendered inside the scroll container */
  children: React.ReactNode;

  /**
   * Speed of the scroll animation in milliseconds. Lower = faster. Positive only.
   * @default 10
   */
  scrollSpeed?: number;

  /**
   * Distance to scroll in pixels per interval. Positive only.
   * @default 10
   */
  scrollDistance?: number;

  /**
   * Padding in pixels before the end to stop scrolling. Positive only.
   * @default 10
   */
  scrollEndPadding?: number;

  /** Custom className for the inner scrollable container */
  containerClassName?: string;

  /**
   * Whether to show scroll indicators when content overflows.
   * @default true
   */
  showScrollIndicators?: boolean;

  /**
   * Whether to show horizontal scroll indicators.
   * @default true
   */
  horizontalScrollIndicators?: boolean;

  /**
   * Whether to show vertical scroll indicators.
   * @default false
   */
  verticalScrollIndicators?: boolean;

  /** Custom className for horizontal scroll indicators (left/right) */
  horizontalIndicatorClassName?: string;

  /** Custom className for vertical scroll indicators (up/down) */
  verticalIndicatorClassName?: string;

  /**
   * Whether to scroll when hovering over indicators.
   * @default true
   */
  scrollOnHover?: boolean;

  /**
   * Whether to hide the horizontal scrollbar (scroll still works).
   * @default false
   */
  hideHorizontalScrollbar?: boolean;

  /**
   * Whether to hide the vertical scrollbar (scroll still works).
   * @default false
   */
  hideVerticalScrollbar?: boolean;
}

const OverflowContainer = forwardRef(
  (
    {
      className,
      children,
      scrollSpeed = 10,
      scrollDistance = 10,
      scrollEndPadding = 10,
      containerClassName,
      showScrollIndicators = true,
      horizontalScrollIndicators = true,
      verticalScrollIndicators = false,
      horizontalIndicatorClassName,
      verticalIndicatorClassName,
      scrollOnHover = true,
      hideHorizontalScrollbar = false,
      hideVerticalScrollbar = false,
      ...props
    }: OverflowContainerProps,
    forwardedRef: ForwardedRef<HTMLDivElement>
  ) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const [canScrollLeft, setCanScrollLeft] = useState(false);
    const [canScrollRight, setCanScrollRight] = useState(false);
    const [canScrollUp, setCanScrollUp] = useState(false);
    const [canScrollDown, setCanScrollDown] = useState(false);
    const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

    useEffect(() => {
        if (scrollSpeed < 0) {
          console.warn(
            "OverflowContainer: scrollSpeed should be a positive number"
          );
        }
        if (scrollDistance < 0) {
          console.warn(
            "OverflowContainer: scrollDistance should be a positive number"
          );
        }
        if (scrollEndPadding < 0) {
          console.warn(
            "OverflowContainer: scrollEndPadding should be a positive number"
          );
        }
    }, [scrollSpeed, scrollDistance, scrollEndPadding]);

    const startScroll = (scrollDirection: "left" | "right" | "up" | "down") => {
      stopScroll();
      const isHorizontal =
        scrollDirection === "left" || scrollDirection === "right";
      const isBackward = scrollDirection === "left" || scrollDirection === "up";
      const scrollAmount = isBackward ? -scrollDistance : scrollDistance;
      const container = containerRef.current;
      if (!container) return;

      intervalRef.current = setInterval(() => {
        if (!container) return;

        const scrollPos = isHorizontal
          ? container.scrollLeft
          : container.scrollTop;
        const scrollSize = isHorizontal
          ? container.scrollWidth
          : container.scrollHeight;
        const clientSize = isHorizontal
          ? container.clientWidth
          : container.clientHeight;

        const canScroll = isBackward
          ? scrollPos > 0
          : scrollPos < scrollSize - clientSize;

        if (!canScroll) {
          stopScroll();
          return;
        }
        updateScrollButtons();
        container.scrollBy({
          [isHorizontal ? "left" : "top"]: scrollAmount,
        });
      }, scrollSpeed);
    };

    const updateScrollButtons = () => {
      const container = containerRef.current;
      if (!container) return;

      const canScrollLeftVal =
        container.scrollLeft > scrollEndPadding;
      const canScrollRightVal =
        container.scrollLeft <
        container.scrollWidth - container.clientWidth - scrollEndPadding;
      const canScrollUpVal = container.scrollTop > scrollEndPadding;
      const canScrollDownVal =
        container.scrollTop <
        container.scrollHeight - container.clientHeight - scrollEndPadding;

      setCanScrollLeft(canScrollLeftVal);
      setCanScrollRight(canScrollRightVal);
      setCanScrollUp(canScrollUpVal);
      setCanScrollDown(canScrollDownVal);
    };

    const stopScroll = () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    };

    useEffect(() => {
      if (!forwardedRef) return;
      if (typeof forwardedRef === "function") {
        forwardedRef(containerRef.current);
      } else {
        forwardedRef.current = containerRef.current;
      }
    }, [forwardedRef]);

    useEffect(() => {
      updateScrollButtons();
      const container = containerRef.current;
      if (!container) return;

      const resizeObserver = new ResizeObserver(updateScrollButtons);
      resizeObserver.observe(container);

      return () => {
        resizeObserver.disconnect();
        stopScroll();
      };
    }, []);

    return (
      <div
        role="region"
        aria-label="Scrollable content"
        className={cn("overflow-container", className)}
        {...props}
      >
        {showScrollIndicators && (
          <div className="overflow-container__indicators" aria-hidden="true">
            {canScrollLeft && horizontalScrollIndicators && (
              <div
                className={cn(
                  "overflow-container__indicator overflow-container__indicator--left",
                  horizontalIndicatorClassName
                )}
                aria-hidden="true"
                onMouseEnter={() => scrollOnHover && startScroll("left")}
                onMouseLeave={() => scrollOnHover && stopScroll()}
              />
            )}
            {canScrollRight && horizontalScrollIndicators && (
              <div
                className={cn(
                  "overflow-container__indicator overflow-container__indicator--right",
                  horizontalIndicatorClassName
                )}
                aria-hidden="true"
                onMouseEnter={() => scrollOnHover && startScroll("right")}
                onMouseLeave={() => scrollOnHover && stopScroll()}
              />
            )}
            {canScrollUp && verticalScrollIndicators && (
              <div
                className={cn(
                  "overflow-container__indicator overflow-container__indicator--up",
                  verticalIndicatorClassName
                )}
                aria-hidden="true"
                onMouseEnter={() => scrollOnHover && startScroll("up")}
                onMouseLeave={() => scrollOnHover && stopScroll()}
              />
            )}
            {canScrollDown && verticalScrollIndicators && (
              <div
                className={cn(
                  "overflow-container__indicator overflow-container__indicator--down",
                  verticalIndicatorClassName
                )}
                aria-hidden="true"
                onMouseEnter={() => scrollOnHover && startScroll("down")}
                onMouseLeave={() => scrollOnHover && stopScroll()}
              />
            )}
          </div>
        )}
        <div
          className={cn(
            "overflow-container__inner",
            hideHorizontalScrollbar && "overflow-container__inner--hide-scrollbar-x",
            hideVerticalScrollbar && "overflow-container__inner--hide-scrollbar-y",
            containerClassName
          )}
          ref={containerRef}
          onScroll={updateScrollButtons}
        >
          {children}
        </div>
      </div>
    );
  }
);

OverflowContainer.displayName = "OverflowContainer";

export default OverflowContainer;
